// Records a Playwright page to a sharp H.264 MP4.
// Uses a CDP screencast piped into ffmpeg instead of Playwright's built-in
// recordVideo, which is capped at a low VP8 bitrate and looks soft on social.
import { spawn } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

const FPS = 30;

export const FORMATS = {
  // 1280x720 CSS px at 1.5x -> 1920x1080 frames; slightly zoomed so text reads on phones.
  landscape: { viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5, isMobile: false, out: { width: 1920, height: 1080 } },
  // Phone layout, 9:16, rendered at ~2.77x -> 1080x1920 frames.
  vertical: { viewport: { width: 390, height: 693 }, deviceScaleFactor: 1080 / 390, isMobile: true, out: { width: 1080, height: 1920 } },
};

export async function startRecording(page, outFile, { width, height }) {
  const cdp = await page.context().newCDPSession(page);
  const ffmpeg = spawn(ffmpegPath, [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=white,setsar=1`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p',
    '-r', String(FPS), '-movflags', '+faststart', outFile,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  let latest = null;
  cdp.on('Page.screencastFrame', ({ data, sessionId }) => {
    latest = Buffer.from(data, 'base64');
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: width, maxHeight: height, everyNthFrame: 1 });

  // Screencast only emits frames when pixels change, so pump the latest frame
  // at a constant rate, catching up on however many frames wall-clock time says are due.
  // Frames are queued and written only as fast as ffmpeg drains its input,
  // otherwise long takes overflow the pipe (ENOBUFS).
  let started = Date.now();
  let written = 0;
  let pausedAt = null;
  const queue = [];
  let ffmpegError = null;
  ffmpeg.stdin.on('error', (err) => { ffmpegError = err; });
  const flush = () => {
    while (queue.length && !ffmpeg.stdin.writableNeedDrain && !ffmpegError) ffmpeg.stdin.write(queue.shift());
  };
  ffmpeg.stdin.on('drain', flush);
  const pump = () => {
    if (!latest || pausedAt) return;
    const due = Math.floor(((Date.now() - started) / 1000) * FPS);
    while (written < due) {
      queue.push(latest);
      written++;
    }
    flush();
  };
  const timer = setInterval(pump, 1000 / FPS / 2);

  // Pausing drops wall-clock time from the video, so slow loads become a jump cut.
  const pause = () => { pump(); pausedAt ??= Date.now(); };
  const resume = () => { if (pausedAt) { started += Date.now() - pausedAt; pausedAt = null; } };

  const stop = async () => {
    resume();
    pump();
    clearInterval(timer);
    await cdp.send('Page.stopScreencast').catch(() => {});
    await cdp.detach().catch(() => {});
    while (queue.length && !ffmpegError) await new Promise((r) => ffmpeg.stdin.once('drain', r));
    if (ffmpegError) throw ffmpegError;
    ffmpeg.stdin.end();
    await new Promise((resolve, reject) => {
      ffmpeg.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))));
    });
    return written / FPS;
  };
  return { stop, pause, resume };
}

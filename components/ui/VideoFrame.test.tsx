import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import VideoFrame from '@/components/ui/VideoFrame';
import { setReducedMotion } from '@/test/utils';

const props = { src: '/work/mealdirect/teaser.mp4', poster: '/work/mealdirect/poster.jpg', alt: 'Meal Direct website' };

describe('VideoFrame', () => {
  it('renders a muted looping inline video over the poster', () => {
    const { container } = render(<VideoFrame {...props} />);
    expect(screen.getByAltText('Meal Direct website')).toBeTruthy();
    const video = container.querySelector('video')!;
    expect(video).not.toBeNull();
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.hasAttribute('playsinline')).toBe(true);
    expect(video.getAttribute('aria-hidden')).toBe('true');
  });

  it('shows only the poster when the visitor prefers reduced motion', () => {
    setReducedMotion(true);
    const { container } = render(<VideoFrame {...props} />);
    expect(container.querySelector('video')).toBeNull();
    expect(screen.getByAltText('Meal Direct website')).toBeTruthy();
  });

  it('shows only the poster when there is no video', () => {
    const { container } = render(<VideoFrame poster={props.poster} alt={props.alt} />);
    expect(container.querySelector('video')).toBeNull();
  });

  it('plays on hover and pauses on leave in hover mode', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play');
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const { container } = render(<VideoFrame {...props} playOn="hover" framed={false} />);
    const frame = container.firstElementChild!;
    fireEvent.mouseEnter(frame);
    expect(play).toHaveBeenCalled();
    fireEvent.mouseLeave(frame);
    expect(pause).toHaveBeenCalled();
  });
});

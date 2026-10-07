import type { ImgHTMLAttributes } from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { setReducedMotion } from './test/utils';

type NextImageProps = ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean };

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: NextImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
HTMLMediaElement.prototype.play = function play() {
  return Promise.resolve();
};
HTMLMediaElement.prototype.pause = function pause() {};

beforeEach(() => setReducedMotion(false));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

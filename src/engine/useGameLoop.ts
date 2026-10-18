import { useEffect, useRef } from 'react';

// Calls `onFrame(dtMs)` every animation frame while `running` is true.
export function useGameLoop(onFrame: (dtMs: number) => void, running = true) {
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let id = requestAnimationFrame(function tick(now) {
      // Clamp dt so a backgrounded app doesn't explode the physics step.
      cb.current(Math.min(now - last, 32));
      last = now;
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [running]);
}

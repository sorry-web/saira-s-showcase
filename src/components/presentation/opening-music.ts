// Original six-second ambient chord, generated locally with no media downloads.
export function playOpeningMusic(): () => void {
  if (typeof window === "undefined" || !window.AudioContext) return () => {};
  let context: AudioContext;
  try { context = new window.AudioContext(); } catch { return () => {}; }
  let timer: ReturnType<typeof setTimeout> | undefined;
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    void context.close().catch(() => {});
  };
  const schedule = () => {
    if (stopped) return;
    const now = context.currentTime;
    const master = context.createGain();
    master.gain.value = 0.18;
    master.connect(context.destination);
    [261.63, 329.63, 392, 523.25].forEach((frequency, index) => {
      const start = now + index * 0.28;
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(0.24, start + 0.16);
      envelope.gain.exponentialRampToValueAtTime(0.001, now + 5.8);
      envelope.gain.linearRampToValueAtTime(0, now + 6);
      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(start);
      oscillator.stop(now + 6);
    });
    timer = setTimeout(stop, 6200);
  };
  if (context.state === "running") schedule();
  else void context.resume().then(schedule).catch(stop);
  return stop;
}
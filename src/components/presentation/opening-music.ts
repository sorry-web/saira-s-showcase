// Original snare roll and cymbal finale, synthesized locally without media hosts.
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
    master.gain.value = 0.5;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -14;
    compressor.ratio.value = 5;
    master.connect(compressor);
    compressor.connect(context.destination);
    const noise = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;

    const percussion = (start: number, level: number, duration: number, crash = false) => {
      const source = context.createBufferSource();
      source.buffer = noise;
      source.loop = true;
      const filter = context.createBiquadFilter();
      filter.type = crash ? "highpass" : "bandpass";
      filter.frequency.value = crash ? 6500 : 2300;
      filter.Q.value = crash ? 0.7 : 0.65;
      const envelope = context.createGain();
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(level, start + 0.002);
      envelope.gain.exponentialRampToValueAtTime(0.001, start + duration);
      source.connect(filter);
      filter.connect(envelope);
      envelope.connect(master);
      source.start(start);
      source.stop(start + duration + 0.01);
    };
    const tone = (start: number, frequency: number, level: number, duration: number, metallic = false) => {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = metallic ? "square" : "triangle";
      oscillator.frequency.setValueAtTime(frequency, start);
      if (!metallic) oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.55, start + duration);
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(level, start + 0.003);
      envelope.gain.exponentialRampToValueAtTime(0.001, start + duration);
      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.01);
    };
    // Accelerating alternating strokes with a rising crescendo and snare body.
    let stroke = 0;
    for (let offset = 0; offset < 3.8;) {
      const progress = offset / 3.8;
      const accent = stroke % 2 === 0 ? 1 : 0.76;
      const level = (0.2 + progress * 0.6) * accent;
      percussion(now + offset, level, 0.11);
      tone(now + offset, 185, level * 0.3, 0.075);
      offset += 0.095 - progress * 0.063;
      stroke++;
    }
    const finale = now + 3.85;
    percussion(finale, 0.95, 2.1, true);
    tone(finale, 105, 0.65, 0.5);
    [2053, 3047, 4093, 5471, 6323].forEach((frequency) => {
      tone(finale, frequency, 0.025, 1.6, true);
    });
    timer = setTimeout(stop, 6200);
  };
  if (context.state === "running") schedule();
  else void context.resume().then(schedule).catch(stop);
  return stop;
}
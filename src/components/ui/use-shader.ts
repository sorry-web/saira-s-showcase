import { useEffect, useRef } from "react";

export function useShader(fragmentShader: string, mode: "aurora" | "lines") {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    void import("three").then((THREE) => {
      if (cancelled) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = { iTime: { value: 0 }, time: { value: 1 }, iResolution: { value: new THREE.Vector2() }, resolution: { value: new THREE.Vector2() } };
      const material = new THREE.ShaderMaterial({ uniforms, fragmentShader, vertexShader: "void main() { gl_Position = vec4(position, 1.0); }" });
      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));
      container.appendChild(renderer.domElement);
      const resize = () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height);
        uniforms.resolution.value.copy(uniforms.iResolution.value);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();
      let frame = 0;
      let last = performance.now();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const animate = (now: number) => {
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!document.hidden) {
          uniforms.iTime.value += delta * 0.5;
          uniforms.time.value += delta * (mode === "lines" ? 1.5 : 1);
          renderer.render(scene, camera);
        }
        if (!reduced.matches) frame = requestAnimationFrame(animate);
      };
      animate(performance.now());
      cleanup = () => { cancelAnimationFrame(frame); observer.disconnect(); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
    });
    return () => { cancelled = true; cleanup?.(); };
  }, [fragmentShader, mode]);
  return containerRef;
}
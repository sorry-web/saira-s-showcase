import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, GraduationCap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scenes, nextScene } from "./data";
import { PresentationScene } from "./scenes";
import { StartScreen } from "./start-screen";
import { playOpeningMusic } from "./opening-music";

export function Presentation() {
  const [started, setStarted] = useState(false);
  const stopMusic = useRef<(() => void) | undefined>(undefined);
  const [state, setState] = useState({ index: 0, finished: false });
  const start = useCallback(() => {
    stopMusic.current?.();
    stopMusic.current = playOpeningMusic();
    setStarted(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const advance = useCallback(() => {
    stopMusic.current?.();
    setState((current) => nextScene(current.index, current.finished));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => {
    const onVisibility = () => { if (document.hidden) stopMusic.current?.(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { stopMusic.current?.(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);
  useEffect(() => {
    if (!started) return;
    const handler = (event: KeyboardEvent) => {
      const target = event.target;
      if (event.repeat || (target instanceof HTMLElement && (target.matches("input, textarea, select, button") || target.isContentEditable))) return;
      if (event.key === "ArrowRight" || event.code === "Space") { event.preventDefault(); advance(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, started]);
  const scene = scenes[state.index];
  const last = state.index === scenes.length - 1;
  return <main className="presentation-app">
    {started && <progress className="presentation-progress" value={state.finished ? scenes.length : state.index + 1} max={scenes.length} aria-label="Presentation progress" />}
    <header className="presentation-header"><div className="presentation-brand"><span className="brand-mark"><GraduationCap size={18} strokeWidth={1.5} /></span><span>ST ANTHONY’S <b>REIMAGINED</b></span></div><span className="header-context">A McKINSEY 7-S CASE STUDY</span>{started && <div className="scene-counter"><span>{String(state.index + 1).padStart(2, "0")}</span><i />{String(scenes.length).padStart(2, "0")}</div>}</header>
    {started ? <div key={`${state.index}-${state.finished}`} className="scene-stage"><PresentationScene index={state.index} finished={state.finished} /></div> : <StartScreen onStart={start} />}
    {started && <footer className="presentation-footer"><div className="footer-chapter"><span>{String(state.index + 1).padStart(2, "0")} <i /> {state.finished ? "Complete" : scene?.chapter}</span><small>INDIVIDUAL CASE STUDY PRESENTATION</small></div><Button variant="presentation" onClick={advance}>{state.finished ? "Restart Presentation" : last ? "Finish Presentation" : "Continue"}{state.finished ? <RotateCcw /> : <ArrowRight />}</Button><div className="footer-signature">MS SAIRA IMTIAZ<span>EDUCATIONAL LEADERSHIP</span></div></footer>}
  </main>;
}
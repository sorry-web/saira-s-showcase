import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import before from "@/assets/classroom-before.jpg";
import after from "@/assets/classroom-after.jpg";

export function Comparison() {
  const [value, setValue] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const update = (position: number) => {
    const next = Math.max(0, Math.min(100, position));
    setValue(next);
    ref.current?.style.setProperty("--comparison", `${next}%`);
  };
  return <div className="comparison-wrap">
    <div ref={ref} className="comparison" aria-label="Illustrative current and proposed classroom comparison">
      <img src={after} alt="Proposed classroom: students collaborating with teacher support" width={1536} height={1024} loading="lazy" />
      <img className="comparison-before" src={before} alt="Current concern illustrated: traditional whole-class teaching" width={1536} height={1024} loading="lazy" />
      <span className="comparison-label comparison-label-before">CURRENT CHALLENGE</span>
      <span className="comparison-label comparison-label-after">PROPOSED FUTURE</span>
      <div className="comparison-divider"><span><ChevronsLeftRight size={22} /></span></div>
      <input type="range" min={0} max={100} value={value} onChange={(event) => update(Number(event.target.value))} aria-label="Before and after comparison" aria-valuetext={`${value}% current classroom, ${100 - value}% proposed classroom`} />
    </div>
    <p className="image-note">Illustrative vision, not an achieved outcome. Generated photographs are not images of the actual school.</p>
    <div className="comparison-points"><span>Isolated practice <b>→</b> Shared professional learning</span><span>Reactive responses <b>→</b> Evidence-informed support</span></div>
  </div>;
}
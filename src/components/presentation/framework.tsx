import { useState } from "react";
import { Button } from "@/components/ui/button";
import { elements } from "./data";

export function Framework({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState("Shared Values");
  const element = elements.find((item) => item.name === selected);
  return <div className={compact ? "framework compact-framework" : "framework"}>
    <div className="framework-map" aria-label="McKinsey seven-element alignment model">
      <svg className="framework-connections" viewBox="0 0 600 500" aria-hidden="true">
        <path d="M300 60 L495 150 L495 350 L300 445 L105 350 L105 150 Z M300 60 L300 445 M495 150 L105 350 M105 150 L495 350 M300 250 L300 60 M300 250 L495 150 M300 250 L495 350 M300 250 L300 445 M300 250 L105 350 M300 250 L105 150" />
        <circle cx="300" cy="250" r="150" className="framework-orbit" />
      </svg>
      {elements.map((item) => <Button key={item.name} variant="ghost" className={`framework-node node-${item.name.toLowerCase().replace(" ", "-")} ${selected === item.name ? "node-selected" : ""}`} onClick={() => setSelected(item.name)} aria-pressed={selected === item.name}>
        {item.name === "Shared Values" && <span className="node-eyebrow">AT THE HEART</span>}{item.name}
      </Button>)}
    </div>
    {!compact && <div className="framework-detail" aria-live="polite"><span className="eyebrow">{selected}</span><h3>{element?.label}</h3><p>{element?.connection}</p><span className="framework-key"><i /> Six elements connected by one shared purpose.</span></div>}
  </div>;
}
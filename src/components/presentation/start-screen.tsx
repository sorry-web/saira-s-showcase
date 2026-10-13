import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import school from "@/assets/school-campus.jpg";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return <section className="presentation-start">
    <img className="hero-photograph" src={school} alt="An illustrative St Anthony’s School campus" width={1920} height={1088} fetchPriority="high" />
    <div className="hero-shade" aria-hidden="true" />
    <div className="start-content">
      <span className="eyebrow">THE McKINSEY 7-S CASE STUDY</span>
      <h1>St Anthony’s<br /><em>Reimagined.</em></h1>
      <div className="closing-author">Created & presented by <strong>Ms Saira Imtiaz</strong></div>
      <Button variant="presentation" onClick={onStart}>Start Presentation<Play aria-hidden="true" /></Button>
    </div>
  </section>;
}
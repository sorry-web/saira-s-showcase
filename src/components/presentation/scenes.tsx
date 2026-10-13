import { ArrowDownRight, ArrowRight, BookOpen, CalendarX2, ChartNoAxesCombined, Check, GraduationCap, HeartHandshake, MessageCircle, Network, ShieldCheck, Sparkles, Users } from "lucide-react";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import AnoAI from "@/components/ui/animated-shader-background";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { LampContainer } from "@/components/ui/lamp";
import meeting from "@/assets/leadership-meeting.jpg";
import classroom from "@/assets/classroom-after.jpg";
import { elements, scenes } from "./data";
import { Framework } from "./framework";
import { Comparison } from "./comparison";

function SceneHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="scene-heading"><div className="eyebrow"><span className="small-line" />{eyebrow}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function Roadmap({ detailed = false }: { detailed?: boolean }) {
  const stages = [{ number: "01", title: "Diagnose", time: "FIRST TERM", text: "Listen to stakeholders. Establish baselines. Identify urgent learning gaps." }, { number: "02", title: "Improve", time: "YEAR ONE", text: "Implement priority actions. Coach teachers. Review learning and attendance." }, { number: "03", title: "Sustain", time: "YEARS TWO & THREE", text: "Refine what works. Embed effective routines. Build lasting ownership." }];
  return <div className={`strategic-roadmap ${detailed ? "roadmap-detailed" : ""}`}>{stages.map((stage) => <div className="roadmap-stage" key={stage.title}><span className="roadmap-number">{stage.number}<ArrowRight size={20} /></span><span className="eyebrow">{stage.time}</span><h3>{stage.title}</h3><p>{stage.text}</p></div>)}</div>;
}

function ElementScene({ index }: { index: number }) {
  const element = elements[index];
  if (!element) return null;
  const icons = [ChartNoAxesCombined, Network, ShieldCheck, HeartHandshake, MessageCircle, Users, Sparkles];
  const Icon = icons[index] ?? BookOpen;
  return <section className={`content-scene element-scene element-${index}`}>
    <SceneHeading eyebrow={`THE ${index + 1}${index === 0 ? "ST" : index === 1 ? "ND" : index === 2 ? "RD" : "TH"} ELEMENT · ${element.name.toUpperCase()}`} title={element.label} />
    <div className="element-layout">
      <div className="element-copy">
        <div className="element-block"><span className="detail-label">THE CURRENT CONCERN</span><p>{element.concern}</p></div>
        <div className="element-block"><span className="detail-label accent-label">THE INTERVENTION</span><p>{element.action}</p></div>
        <div className="element-block"><span className="detail-label gold-label">THE EXPECTED IMPACT</span><p>{element.impact}</p></div>
      </div>
      <div className="element-visual">
        {index === 0 ? <Roadmap /> : index === 1 ? <div className="organisation"><div className="organisation-lead"><GraduationCap /><span>Ms Aminah<small>PRINCIPAL · STRATEGIC DIRECTION</small></span></div><div className="organisation-team">School Improvement Team</div><div className="organisation-members"><span>Teachers<small>IMPLEMENTATION</small></span><span>Student leaders<small>EXPERIENCE & VOICE</small></span><span>School board<small>GOVERNANCE</small></span></div><p>Academic progress · Attendance · Teaching innovation · Staff development</p></div> : index === 2 ? <div className="evidence-cycle">{["Collect evidence", "Identify needs", "Take action", "Review results"].map((text, i) => <div key={text}><span>0{i + 1}</span><h3>{text}</h3><ArrowDownRight /></div>)}</div> : index === 3 ? <Framework compact /> : <figure className="element-photo"><img src={index === 6 ? classroom : meeting} alt={index === 6 ? "Illustrative collaborative learning in a modern classroom" : "Illustrative school leadership and teacher collaboration"} loading="lazy" width={1536} height={1024} /><figcaption><Icon size={18} />{index === 4 ? "Leadership begins with listening." : index === 5 ? "People are the agents of change." : "Practice is where progress becomes visible."}</figcaption></figure>}
        <div className="success-indicators"><span className="detail-label">WHAT SUCCESS LOOKS LIKE</span>{element.indicators.map((indicator) => <div key={indicator}><Check size={14} /><span>{indicator}</span></div>)}</div>
      </div>
    </div>
    <div className="connection-note"><Network size={18} /><span><b>CONNECTED, NOT ISOLATED</b>{element.connection}</span></div>
    {index === 3 && <LampContainer><blockquote>“A school improves sustainably when its people believe in the direction they are moving.”</blockquote></LampContainer>}
  </section>;
}

export function PresentationScene({ index, finished }: { index: number; finished: boolean }) {
  const scene = scenes[index];
  if (!scene) return null;
  if (finished) return <section className="closing-scene"><ShaderAnimation /><div className="closing-content"><span className="eyebrow">THE PRESENTATION IS COMPLETE</span><h2>Thank you.</h2><p>Seven interconnected elements.<br />One sustainable transformation.</p><div className="closing-author">Created & presented by <strong>Ms Saira Imtiaz</strong></div></div></section>;
  if (index === 0) return <CinematicHero><div className="hero-reveal opening-eyebrow"><span className="small-line" />EDUCATIONAL LEADERSHIP & CHANGE MANAGEMENT</div><h1 className="hero-reveal">Reimagining<br />school <em>excellence.</em></h1><p className="hero-reveal hero-subtitle">Transforming St Anthony’s School<br />through the McKinsey 7-S Framework</p><p className="hero-reveal hero-quote">Seven interconnected elements.<br className="mobile-break" /> One sustainable transformation.</p><div className="hero-reveal opening-author"><span className="author-line" /><div><span>CREATED & PRESENTED BY</span><strong>Ms Saira Imtiaz</strong><small>Individual case study presentation</small></div></div></CinematicHero>;
  if (index === 1) return <section className="content-scene crossroads-scene"><SceneHeading eyebrow="THE CASE FOR CHANGE" title="A school at a crossroads." description="When performance declines, the entire system needs attention." /><div className="challenge-grid">{[{ icon: ChartNoAxesCombined, title: "Declining academic performance", text: "Student progress needs an evidence-led improvement plan." }, { icon: HeartHandshake, title: "Low teacher morale", text: "Professional support and shared ownership need attention." }, { icon: BookOpen, title: "Outdated teaching practices", text: "Classroom learning needs to become more engaging." }, { icon: CalendarX2, title: "High student absenteeism", text: "Barriers to attendance need a supportive response." }].map(({ icon: Icon, title, text }, i) => <div className="challenge" key={title}><span className="challenge-number">0{i + 1}</span><Icon size={30} strokeWidth={1.3} /><h3>{title}</h3><p>{text}</p></div>)}</div><div className="inspectorate"><ShieldCheck size={22} /><div><span className="detail-label gold-label">THE CATALYST</span><p>A negative inspectorate review creates urgency.<br /><strong>But urgency alone is not a strategy.</strong></p></div></div></section>;
  if (index === 2) return <section className="question-scene"><AnoAI /><div className="question-content"><span className="eyebrow">THE CENTRAL LEADERSHIP QUESTION</span><h2>Separate problems.<br />Or <em>one interconnected<br className="desktop-break" /> system?</em></h2><p>Isolated solutions offer temporary relief.<br />Alignment makes improvement sustainable.</p><div className="stakeholder-line"><span><Users />Student leaders</span><i /><span><BookOpen />Teachers</span><i /><span><ShieldCheck />School board</span></div><p className="question-footnote">Ms Aminah brings all three voices into one shared task force.</p></div></section>;
  if (index === 3) return <section className="content-scene framework-scene"><SceneHeading eyebrow="THE McKINSEY 7-S FRAMEWORK" title="Seven elements. One aligned organisation." description="An organisational diagnostic model built around interdependence—not isolated fixes." /><Framework /></section>;
  if (index >= 4 && index <= 10) return <ElementScene index={index - 4} />;
  if (index === 11) return <section className="content-scene transformation-scene"><SceneHeading eyebrow="AN ILLUSTRATIVE BEFORE & AFTER" title="From isolated effort to collective progress." description="The transformation is not just a better classroom. It is a better-connected school." /><Comparison /></section>;
  if (index === 12) return <section className="content-scene roadmap-scene"><SceneHeading eyebrow="A THREE-YEAR IMPROVEMENT JOURNEY" title="Diagnose. Improve. Sustain." description="Start with evidence. Pace the change. Keep learning from the results." /><Roadmap detailed /><div className="roadmap-bottom"><div><span className="detail-label">MANAGE THE RISKS</span><p>Workload, resources and resistance require realistic pacing and ongoing dialogue.</p></div><div><span className="detail-label gold-label">THE NON-NEGOTIABLE</span><p>Set numerical targets only after baseline data is collected.</p></div></div></section>;
  if (index === 13) return <section className="content-scene evaluation-scene"><SceneHeading eyebrow="EVIDENCE, REVIEW & CONTINUOUS IMPROVEMENT" title="Measure progress. Not just activity." description="A completed action is not the same as an improved learning outcome." /><div className="evaluation-grid">{[{ icon: ChartNoAxesCombined, title: "Learning & attendance", text: "Review student progress against baseline assessments and attendance patterns." }, { icon: BookOpen, title: "Classroom practice", text: "Look for agreed teaching improvements and meaningful student participation." }, { icon: MessageCircle, title: "People & culture", text: "Listen to staff and students. Review collaboration, support and belonging." }].map(({ icon: Icon, title, text }) => <div key={title}><Icon size={30} strokeWidth={1.3} /><h3>{title}</h3><p>{text}</p></div>)}</div><div className="evaluation-principle"><span className="eyebrow">REVIEW → LEARN → ADAPT</span><blockquote>“Evidence tells us what is changing.<br />People help us understand why.”</blockquote><p>Alignment is not a guarantee. Resources, family circumstances and external expectations still matter.</p></div></section>;
  return <section className="closing-scene"><ShaderAnimation /><div className="closing-content"><span className="eyebrow">THE LASTING PRINCIPLE</span><h2>Excellence is not<br />an isolated change.<br /><em>It is an aligned system.</em></h2><p>Clear direction. Supported people.<br />Reliable routines. Shared purpose.</p><div className="closing-author">Created & presented by <strong>Ms Saira Imtiaz</strong></div><span className="closing-reference">Framework: Waterman, Peters & Phillips (1980), “Structure is not organization.”</span></div></section>;
}
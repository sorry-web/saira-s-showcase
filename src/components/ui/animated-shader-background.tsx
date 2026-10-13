import { auroraShader } from "./shader-sources";
import { useShader } from "./use-shader";

// The supplied AnoAI shader becomes the backdrop to the systems-thinking question.
export default function AnoAI() {
  const ref = useShader(auroraShader, "aurora");
  return <div ref={ref} className="shader-background shader-aurora" aria-hidden="true" />;
}
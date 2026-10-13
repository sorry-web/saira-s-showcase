import { lineShader } from "./shader-sources";
import { useShader } from "./use-shader";

export function ShaderAnimation() {
  const ref = useShader(lineShader, "lines");
  return <div ref={ref} className="shader-background shader-lines" aria-hidden="true" />;
}
import { describe, expect, it } from "vitest";
import { nextScene, scenes, elements } from "@/components/presentation/data";

describe("Presentation progression", () => {
  it("advances exactly one scene", () => {
    expect(nextScene(0, false)).toEqual({ index: 1, finished: false });
  });
  it("finishes without advancing beyond the final scene", () => {
    expect(nextScene(14, false)).toEqual({ index: 14, finished: true });
  });
  it("restarts from the opening after completion", () => {
    expect(nextScene(14, true)).toEqual({ index: 0, finished: false });
  });
  it("includes each of the seven organisational elements once", () => {
    expect(elements.map((element) => element.name)).toEqual(["Strategy", "Structure", "Systems", "Shared Values", "Style", "Staff", "Skills"]);
    expect(scenes).toHaveLength(15);
  });
  it("provides approximately ten minutes of presentation pacing", () => {
    const seconds = scenes.reduce((total, scene) => total + scene.seconds, 0);
    expect(seconds).toBeGreaterThanOrEqual(570);
    expect(seconds).toBeLessThanOrEqual(660);
  });
});
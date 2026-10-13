import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Presentation } from "@/components/presentation/presentation";
import { playOpeningMusic } from "@/components/presentation/opening-music";

vi.mock("@/components/presentation/opening-music", () => ({ playOpeningMusic: vi.fn(() => vi.fn()) }));
vi.mock("@/components/presentation/scenes", () => ({ PresentationScene: ({ index }: { index: number }) => <div data-testid="scene">{index}</div> }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("Presentation opening", () => {
  it("waits for Start before showing the first slide or playing music", () => {
    render(<Presentation />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.queryByTestId("scene")).not.toBeInTheDocument();
    expect(playOpeningMusic).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Start Presentation" }));
    expect(screen.getByTestId("scene").textContent).toBe("0");
    expect(playOpeningMusic).toHaveBeenCalledTimes(1);
  });
  it("stops opening music when advancing", () => {
    const stop = vi.fn();
    vi.mocked(playOpeningMusic).mockReturnValueOnce(stop);
    render(<Presentation />);
    fireEvent.click(screen.getByRole("button", { name: "Start Presentation" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(stop).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("scene").textContent).toBe("1");
  });
});
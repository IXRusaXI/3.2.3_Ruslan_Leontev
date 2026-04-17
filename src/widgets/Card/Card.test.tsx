import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "../../test/test-utils";
import { LaunchCard } from "./Card";

describe("LaunchCard", () => {
  it("отображает данные миссии и вызывает onSeeMore по клику", async () => {
    const onSeeMore = vi.fn();
    const user = userEvent.setup();

    render(
      <LaunchCard
        missionName="Mission X"
        rocketName="Rocket Y"
        imageUrl="image.png"
        onSeeMore={onSeeMore}
      />
    );

    expect(screen.getByText("Mission X")).toBeInTheDocument();
    expect(screen.getByText("Rocket Y")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /see more/i });
    await user.click(button);

    expect(onSeeMore).toHaveBeenCalledTimes(1);
  });
});
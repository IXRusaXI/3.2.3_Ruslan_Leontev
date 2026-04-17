import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "../../test/test-utils";
import { List } from "./List";
import type { Launch } from "../../app/state";

describe("List", () => {
  it("рендерит карточки и вызывает onSeeMore c нужным запуском", async () => {
    const launches: Launch[] = [
      {
        id: 1,
        missionName: "Mission 1",
        rocketName: "Falcon 9",
        imageUrl: "img1.png",
        description: "desc1",
      },
      {
        id: 2,
        missionName: "Mission 2",
        rocketName: "Falcon Heavy",
        imageUrl: "img2.png",
        description: "desc2",
      },
    ];

    const handleSeeMore = vi.fn();
    const user = userEvent.setup();

    render(<List launches={launches} onSeeMore={handleSeeMore} />);

    expect(screen.getByText("Mission 1")).toBeInTheDocument();
    expect(screen.getByText("Mission 2")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button", { name: /see more/i });
    await user.click(buttons[0]);

    expect(handleSeeMore).toHaveBeenCalledTimes(1);
    expect(handleSeeMore).toHaveBeenCalledWith(launches[0]);
  });
});
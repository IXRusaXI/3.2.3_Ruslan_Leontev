import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/test-utils";
import { LaunchModal } from "./Modal";
import type { Launch } from "../../app/state";

const launch: Launch = {
  id: 1,
  missionName: "Mission X",
  rocketName: "Rocket Y",
  imageUrl: "image.png",
  description: "Details here",
};

describe("LaunchModal", () => {
  it("не рендерится, если launch = null", () => {
    const { queryByText } = render(
      <LaunchModal opened={true} onClose={() => {}} launch={null} />
    );
    expect(queryByText(/Mission name/i)).toBeNull();
  });

  it("отображает данные запуска, когда открыт", () => {
    render(<LaunchModal opened={true} onClose={() => {}} launch={launch} />);

    // заголовки блоков
    expect(screen.getByText("Mission name")).toBeInTheDocument();
    expect(screen.getByText("Rocket name")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();

    // значения могут встречаться несколько раз (хедер + блоки)
    const missionTexts = screen.getAllByText("Mission X");
    expect(missionTexts.length).toBeGreaterThan(0);

    const rocketTexts = screen.getAllByText("Rocket Y");
    expect(rocketTexts.length).toBeGreaterThan(0);

    expect(screen.getByText("Details here")).toBeInTheDocument();
  });
});
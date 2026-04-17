import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "./test/test-utils";
import App from "./App";
import type { ApiLaunch } from "./app/state";

describe("App", () => {
    it("загружает и отображает список запусков, открывает модалку", async () => {
    const mockData: ApiLaunch[] = [
        {
        flight_number: 1,
        mission_name: "Test Mission",
        rocket: { rocket_name: "Falcon 9" },
        links: { mission_patch: null },
        details: "Some details",
        },
    ];

    const fetchMock = vi
        .spyOn(window, "fetch")
        .mockResolvedValue({
        ok: true,
        json: async () => mockData,
        } as Response);

    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByText(/Loading launches/i)).toBeInTheDocument();

    const missionTitle = await screen.findByText("Test Mission");
    expect(missionTitle).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /see more/i });
    await user.click(button);

    const detailsTitle = await screen.findByText("Details");
    expect(detailsTitle).toBeInTheDocument();

    fetchMock.mockRestore();
    });
});
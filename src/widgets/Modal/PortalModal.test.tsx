import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../test/test-utils";
import { PortalModal } from "./PortalModal";

describe("PortalModal", () => {
  it("ничего не рендерит, когда closed", () => {
    const { queryByText } = render(
      <PortalModal opened={false} onClose={() => {}}>
        <div>Content</div>
      </PortalModal>
    );
    expect(queryByText("Content")).toBeNull();
  });

  it("рендерит детей, когда opened = true", () => {
    render(
      <PortalModal opened={true} onClose={() => {}}>
        <div>Content</div>
      </PortalModal>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("вызывает onClose при клике по оверлею", () => {
    const onClose = vi.fn();

    render(
      <PortalModal opened={true} onClose={onClose}>
        <div>Content</div>
      </PortalModal>
    );

    const overlay = document.querySelector("#modal-root > div");
    if (!overlay) throw new Error("Overlay not found");

    (overlay as HTMLDivElement).click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Box, Group } from "@mantine/core";
import "./modal.css";

interface PortalModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function PortalModal({ opened, onClose, children }: PortalModalProps) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;
  if (!opened) return null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <Box
      pos="fixed"
      inset={0}
      bg="rgba(0, 0, 0, 0.4)"
      style={{ zIndex: 1000, display: "flex" }}
      onClick={onClose}
    >

      <Group
        justify="center"
        align="center"
        w="100%"
      >

        <Box
          bg="white"
          p="xl"
          maw={600}
          w="100%"
          mx="md"
          onClick={(e) => e.stopPropagation()}
          className="modal-scroll"
        >
          {children}
        </Box>
      </Group>
    </Box>,
    modalRoot
  );
}
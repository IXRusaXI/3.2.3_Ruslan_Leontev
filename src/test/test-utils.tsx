import { type ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import userEvent from "@testing-library/user-event";

export function render(ui: ReactElement) {
  return rtlRender(
    <MantineProvider>
      {ui}
    </MantineProvider>
  );
}

// Также реэкспортируем всё остальное из RTL, чтобы импорт был из одного места
export * from "@testing-library/react";
export { userEvent };
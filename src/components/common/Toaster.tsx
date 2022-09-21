import { ToasterContainer } from "baseui/toast";
import * as React from "react";

export function Toaster() {
  return (
    <ToasterContainer
      autoHideDuration={2000}
      overrides={{
        Root: {
          style: () => ({
            zIndex: 4,
          }),
        },
      }}
    />
  );
}

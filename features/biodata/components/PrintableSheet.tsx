import type { ReactNode } from "react";

// The only job of this wrapper: give the print CSS one known element to isolate.
export default function PrintableSheet({ children }: { children: ReactNode }) {
  return <div id="print-area">{children}</div>;
}
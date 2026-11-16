import type { ComponentType } from "react";
import type { BiodataView } from "../types";

const SHEET_PX = 793.7; // 210mm at 96dpi
const WIDTH = 200;
const SCALE = WIDTH / SHEET_PX;

export default function TemplateThumbnail({
  component: Template,
  data,
}: {
  component: ComponentType<{ data: BiodataView }>;
  data: BiodataView;
}) {
  return (
    <div
      style={{ width: WIDTH, height: Math.round(1122.5 * SCALE), overflow: "hidden", pointerEvents: "none", position: "relative" }}
      aria-hidden
    >
      <div style={{ width: SHEET_PX, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <Template data={data} />
      </div>
    </div>
  );
}
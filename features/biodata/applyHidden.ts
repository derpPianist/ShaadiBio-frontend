import type { BiodataView } from "./types";

// Returns a copy of the view without the hidden fields.
// Sections left with no fields are dropped, so no empty headings get printed.
export const applyHidden = (view: BiodataView, hidden: Set<string>): BiodataView => ({
  ...view,
  sections: view.sections
    .map((s) => ({ ...s, fields: s.fields.filter((f) => !hidden.has(f.key)) }))
    .filter((s) => s.fields.length > 0),
});
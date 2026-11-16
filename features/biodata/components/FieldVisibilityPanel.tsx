"use client";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { BiodataView } from "../types";

type Props = {
  fullView: BiodataView; // the UNFILTERED view, so hidden fields stay listed and can be re-enabled
  hidden: Set<string>;
  onToggle: (key: string) => void;
  onReset: () => void;
  onPrint: () => void;
  onBack: () => void;
  onChangeTemplate: () => void;
};

export default function FieldVisibilityPanel({
  fullView,
  hidden,
  onToggle,
  onReset,
  onPrint,
  onBack,
  onChangeTemplate,
}: Props) {
  return (
    <Paper
      className="no-print"
      sx={{
        width: 280,
        p: 2,
        position: "sticky",
        top: 80,
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <Button variant="contained" fullWidth onClick={onPrint}>
        Print / Save as PDF
      </Button>
      <Button fullWidth onClick={onChangeTemplate} sx={{ mt: 1 }}>
        Change template
      </Button>
      <Button fullWidth onClick={onBack} sx={{ mt: 1 }}>
        Back to dashboard
      </Button>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight={600}>
        Show on biodata
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Untick anything you don&apos;t want printed.
      </Typography>

      {fullView.sections.map((section) => (
        <FormGroup key={section.id} sx={{ mt: 2 }}>
          <Typography variant="overline" color="text.secondary">
            {section.title}
          </Typography>
          {section.fields.map((f) => (
            <FormControlLabel
              key={f.key}
              control={
                <Checkbox
                  size="small"
                  checked={!hidden.has(f.key)}
                  onChange={() => onToggle(f.key)}
                />
              }
              label={f.label}
            />
          ))}
        </FormGroup>
      ))}

      <Button size="small" onClick={onReset} sx={{ mt: 2 }}>
        Show all
      </Button>
    </Paper>
  );
}

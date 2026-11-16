"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { TEMPLATES } from "../templates";
import type { BiodataView } from "../types";
import TemplateThumbnail from "./TemplateThumbnail";

export default function TemplatePicker({ profileId, view }: { profileId: string; view: BiodataView }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
      {Object.entries(TEMPLATES).map(([id, t]) => (
        <Card key={id} sx={{ borderRadius: 3 }}>
          <CardActionArea component={Link} href={`/biodata/${profileId}/${id}`} sx={{ p: 1.5 }}>
            <TemplateThumbnail component={t.component} data={view} />
            <Typography align="center" fontWeight={600} sx={{ mt: 1 }}>
              {t.name}
            </Typography>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
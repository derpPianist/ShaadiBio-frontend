"use client";
import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@/store/hooks";
import { toView } from "@/features/biodata/toView";
import TemplatePicker from "@/features/biodata/components/TemplatePicker";

export default function PickerPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const selected = useAppSelector((s) => s.profiles.selected);
  const hydrated = useAppSelector((s) => s.profiles.hydrated);
  const profile = selected && String(selected.id) === id ? selected : null;
  const view = useMemo(() => (profile ? toView(profile) : null), [profile]);

  useEffect(() => {
    if (hydrated && !profile) router.replace("/dashboard");
  }, [hydrated, profile, router]);

  if (!hydrated || !view) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress aria-label="Loading…" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 10, px: 2 }}>
      <Box sx={{ maxWidth: 900, mx: "auto", mb: 3, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={600}>Choose a format</Typography>
        <Typography color="text.secondary">for {view.name}</Typography>
      </Box>
      <TemplatePicker profileId={id} view={view} />
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button onClick={() => router.push("/dashboard")}>Back to dashboard</Button>
      </Box>
    </Box>
  );
}
"use client";
import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@/store/hooks";
import { toView } from "@/features/biodata/toView";
import { applyHidden } from "@/features/biodata/applyHidden";
import { TEMPLATES, isTemplateId } from "@/features/biodata/templates";
import { useHiddenFields } from "@/features/biodata/hooks/useHiddenFields";
import PrintableSheet from "@/features/biodata/components/PrintableSheet";
import FieldVisibilityPanel from "@/features/biodata/components/FieldVisibilityPanel";

export default function PreviewPage() {
  const { id, templateId } = useParams<{ id: string; templateId: string }>();
  const router = useRouter();

  const selected = useAppSelector((s) => s.profiles.selected);
  const hydrated = useAppSelector((s) => s.profiles.hydrated);
  const profile = selected && String(selected.id) === id ? selected : null;

  const { hidden, toggle, reset } = useHiddenFields();

  const fullView = useMemo(() => (profile ? toView(profile) : null), [profile]);
  const visibleView = useMemo(
    () => (fullView ? applyHidden(fullView, hidden) : null),
    [fullView, hidden]
  );

  useEffect(() => {
    if (hydrated && !profile) router.replace("/dashboard");
  }, [hydrated, profile, router]);

  if (!isTemplateId(templateId)) {
    return <Typography sx={{ p: 4 }}>Unknown template.</Typography>;
  }

  if (!hydrated || !fullView || !visibleView) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress aria-label="Loading…" />
      </Box>
    );
  }

  const Template = TEMPLATES[templateId].component;

  return (
    <Box sx={{ minHeight: "100vh", py: 10, px: 2, bgcolor: "action.hover" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, alignItems: "flex-start", justifyContent: "center" }}>
        <FieldVisibilityPanel
          fullView={fullView}
          hidden={hidden}
          onToggle={toggle}
          onReset={reset}
          onPrint={() => window.print()}
          onBack={() => router.push("/dashboard")}
          onChangeTemplate={() => router.push(`/biodata/${id}`)}
        />

        <Box sx={{ overflowX: "auto", maxWidth: "100%" }}>
          <PrintableSheet>
            <Template data={visibleView} />
          </PrintableSheet>
        </Box>
      </Box>
    </Box>
  );
}
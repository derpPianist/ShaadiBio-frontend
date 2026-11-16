import type { ComponentType } from "react";
import type { BiodataView } from "../types";
import Classic from "./Classic/Classic";
import Floral from "./Floral/Floral";

export const TEMPLATES = {
  classic: { name: "Classic", component: Classic },
  floral: { name: "Floral", component: Floral },   
} satisfies Record<string, { name: string; component: ComponentType<{ data: BiodataView }> }>;

export type TemplateId = keyof typeof TEMPLATES;

// Use this to validate the URL's templateId. hasOwnProperty avoids false
// positives from inherited keys like "toString".
export const isTemplateId = (id: string): id is TemplateId =>
  Object.prototype.hasOwnProperty.call(TEMPLATES, id);
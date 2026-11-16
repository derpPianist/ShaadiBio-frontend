import type { BiodataView, Field, Profile, Section } from "./types";

// ---------- helpers ----------

const clean = (v: unknown): string => (v == null ? "" : String(v).trim());

// "wheatish" -> "Wheatish"
const humanize = (v?: string | null): string =>
  clean(v)
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// DATEONLY comes as "1998-05-14". timeZone: "UTC" stops the date from
// shifting by a day depending on the viewer's timezone.
const formatDate = (d?: string | null): string => {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
};

// Returns null for empty values so they never reach a template.
// Checks for an empty STRING, not falsiness, so no_of_siblings "0" still shows.
function field(key: string, label: string, value: unknown): Field | null {
  const v = clean(value);
  return v ? { key, label, value: v } : null;
}

function section(id: string, title: string, fields: (Field | null)[]): Section {
  return { id, title, fields: fields.filter((f): f is Field => f !== null) };
}

// ---------- main ----------

export function toView(p: Profile): BiodataView {
  const sections: Section[] = [
    section("personal", "Personal Details", [
      field("gender", "Gender", humanize(p.gender)),
      field("dob", "Date of Birth", formatDate(p.DOB)),
      field("complexion", "Complexion", humanize(p.complexion)),
    ]),
    section("education", "Education & Career", [
      field("education", "Education", p.education),
      field("occupation", "Occupation", p.occupation),
      field("income", "Annual Income", p.income),
    ]),
    section("family", "Family Details", [
      field("fatherName", "Father's Name", p.fathers_name),
      field("fatherOccupation", "Father's Occupation", p.fathers_occupation),
      field("motherName", "Mother's Name", p.mothers_name),
      field("motherOccupation", "Mother's Occupation", p.mothers_occupation),
      field("siblings", "Siblings", p.no_of_siblings),
    ]),
    section("contact", "Contact Details", [
      field("contactPerson", "Contact Person", p.contact_person),
      field("contactNumber", "Phone", p.contact_number),
      field("contactEmail", "Email", p.contact_email),
      field("address", "Address", p.residential_address),
    ]),
  ].filter((s) => s.fields.length > 0);

  return {
    name: clean(p.name),
    photoUrl: p.image_url || undefined,
    sections,
  };
}
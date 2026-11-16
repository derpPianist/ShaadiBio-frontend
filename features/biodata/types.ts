
export type Profile = {
  id: string;
  userId: string;
  name: string;
  gender: "male" | "female" | "other";
  DOB: string; // DATEONLY arrives as "YYYY-MM-DD"
  complexion: "fair" | "wheatish" | "dusky" | "dark";
  occupation: string;
  income?: "0-5L" | "5-10L" | "10-20L" | "20-50L" | "50L+" | "Not Disclosed" | null;
  education: "Matriculation" | "Higher-Secondary" | "Graduate" | "Post-Graduate" | "PhD";
  fathers_name?: string | null;
  fathers_occupation?: string | null;
  mothers_name?: string | null;
  mothers_occupation?: string | null;
  no_of_siblings?: "0" | "1" | "2" | "3" | "4" | "5" | "5+" | null;
  contact_person: string;
  contact_number: string;
  contact_email: string;
  residential_address?: string | null;
  image_url: string;
};

export type Field = {
  key: string;
  label: string;
  value: string;
};

export type Section = {
  id: string;
  title: string;
  fields: Field[];
};

export type BiodataView = {
  name: string;
  photoUrl?: string;
  sections: Section[];
};

/**
 * Resulting view
 * 
 * -------------------------Biodata----------------------
 * 
 * Name: "B M Chinnaswamy"
 * 
 * PhotoUrl: <url>
 * 
 * -------- Personal Details (section 1) -----------------
 * 
 * Field1: <field 1 details here>
 * Field2: <field 2 details here>
 * 
 * -------- Educational Background -----------------------
 * 
 * Field1: <field 1 details here>
 * Field2: <field 2 details here>
 * 
 * 
 * ........so on
 * 
 */
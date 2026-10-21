import type { AppointmentContent } from "@/features/home/types/home-content";

export const appointmentContent: AppointmentContent = {
  eyebrow: "07 — Consultations",
  heading: "Begin your healing, quietly.",
  paragraph:
    "Every homoeopathic journey begins with an in-depth constitutional dialogue — a tailored consultation with generous duration, in person or by prior appointment.",
  details: [
    { label: "Clinic Hours", value: "Mon–Sat · 10:00 – 16:00" },
    { label: "Kanpur", value: "Civil Lines, Kanpur, Uttar Pradesh" },
    {
      label: "Faridabad",
      value: "Accord Super Speciality Hospital, Sector 86",
    },
  ],
  phone: "+91 98112 00000",
  form: {
    labels: {
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address (Optional)",
      concern: "Primary Health Concern",
      message: "Message / Notes (Optional)",
    },
    placeholders: {
      name: "e.g. Asha Verma",
      phone: "+91 98xxx xxxxx",
      email: "you@example.com",
      concern: "Choose a concern",
      message: "Briefly describe your health concern and preferred consultation time.",
    },
    concernOptions: [
      "Lifestyle Diseases",
      "Depression & Anxiety",
      "Auto Immune Disorders",
      "Skin, Hair & Alopecia",
      "PCOD & Fibroids",
      "Endocrine Disorders",
      "Cardiac, Lung & Kidney",
      "Children's Health",
      "Other",
    ],
    submitLabel: "Request Appointment",
    note: "Replies within 24 hours · Mon–Sat",
    successMessage:
      "Thank you — your request has been received. We will call you within 24 hours.",
  },
};

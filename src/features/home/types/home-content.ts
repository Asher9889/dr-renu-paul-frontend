export type HeroContent = {
  eyebrow: string;
  headlineLead: string;
  headlineItalic: string;
  headlineTrail: string;
  paragraph: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  footnote: string;
  portrait: { src: string; alt: string; caption: string };
  consultantNote: { label: string; body: string };
};

export type EducationRow = {
  credential: string;
  institution: string;
};

export type PhysicianContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  education: EducationRow[];
  portrait: { src: string; alt: string; caption: string };
  link: { label: string; href: string };
};

export type ExpertiseRow = {
  index: string;
  area: string;
  descriptor: string;
};

export type ExpertiseContent = {
  eyebrow: string;
  heading: string;
  rows: ExpertiseRow[];
  footnote: string;
  link: { label: string; href: string };
};

export type AchievementRow = {
  year: string;
  milestone: string;
  venue: string;
  honored?: boolean;
};

export type AchievementsContent = {
  eyebrow: string;
  heading: string;
  rows: AchievementRow[];
  footnote: string;
  link: { label: string; href: string };
};

export type QuoteContent = {
  quote: string;
  attribution: string;
};

export type JournalPost = {
  category: string;
  title: string;
  excerpt: string;
  image: { src: string; alt: string };
  href: string;
};

export type JournalContent = {
  eyebrow: string;
  heading: string;
  posts: JournalPost[];
};

export type AppointmentDetail = {
  label: string;
  value: string;
};

export type AppointmentFormContent = {
  labels: {
    name: string;
    phone: string;
    email: string;
    concern: string;
    message: string;
  };
  placeholders: {
    name: string;
    phone: string;
    email: string;
    concern: string;
    message: string;
  };
  concernOptions: string[];
  submitLabel: string;
  note: string;
  successMessage: string;
};

export type AppointmentContent = {
  eyebrow: string;
  heading: string;
  paragraph: string;
  details: AppointmentDetail[];
  phone: string;
  form: AppointmentFormContent;
};

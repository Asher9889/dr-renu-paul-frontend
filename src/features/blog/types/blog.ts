export type BlogTagSummary = {
  tag: string;
  count: number;
};

export type BlogParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type BlogHeadingBlock = {
  type: "heading";
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogListBlock = {
  type: "list";
  items: string[];
};

export type BlogQuoteBlock = {
  type: "quote";
  text: string;
  attribution?: string;
};

export type BlogBodyBlock =
  | BlogParagraphBlock
  | BlogHeadingBlock
  | BlogListBlock
  | BlogQuoteBlock;

export type BlogImage = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogPostDate = {
  iso: string;
  label: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: BlogPostDate;
  readTime: string;
  tags: string[];
  thumbnail: BlogImage;
  body: BlogBodyBlock[];
};

export type BlogAuthor = {
  name: string;
  role: string;
  avatar: {
    src: string;
    alt: string;
  };
};

export type BlogListingContent = {
  eyebrow: string;
  headlineLead: string;
  headlineItalic: string;
  headlineTrail: string;
  description: string;
  filterLabel: string;
  mobileFilterLabel: string;
  allTagLabel: string;
  emptyMessage: string;
  emptyActionLabel: string;
};

export type BlogAppointmentContent = {
  eyebrow: string;
  heading: string;
  body: string;
  label: string;
  href: string;
};

export type BlogDetailContent = {
  backLabel: string;
  tocLabel: string;
  authorLabel: string;
  figureLabel: string;
  articleNote: string;
  relatedEyebrow: string;
  relatedHeading: string;
  allNotesLabel: string;
  appointment: BlogAppointmentContent;
};

export const booksContent = {
  listing: {
    eyebrow: "05 — The Book",
    headlineLead: "Books &",
    headlineItalic: "editions",
    description:
      "A collection of knowledge, experience, and insights from years of medical practice — thoughtfully shared to guide you towards better health and well-being.",
    countLabel: "editions",
    emptyTitle: "The shelf is being prepared.",
    emptyDescription:
      "New editions will appear here as they are published. Return shortly.",
    cardCta: "Open the edition",
    freeLabel: "Free preview",
    pagesLabel: "pages",
    priceLabel: "Complete edition",
  },
  detail: {
    backLabel: "All books",
    figureLabel: "Fig. 01 — Cover",
    aboutLabel: "About the edition",
    detailsLabel: "Details",
    authorLabel: "Author",
    pagesLabel: "Pages",
    languageLabel: "Language",
    categoryLabel: "Category",
    priceLabel: "Price",
    freeLabel: "Free",
    previewLabel: "Free preview",
    previewDescription:
      "Read the opening pages freely. The remaining pages open after purchase.",
    previewCount: (free: number, total: number) => `${free} of ${total} pages free`,
    readPreviewLabel: "Read Online Now (Interactive Reader",
    continueReadingLabel: "Continue reading",
    buyLabel: "Buy the complete edition",
    purchaseNote:
      "Purchase opens the complete ebook. The free preview remains available to every reader.",
    lockedTitle: "The rest of the edition",
    lockedDescription:
      "Continue past the free preview by purchasing the complete ebook.",
    processingTitle: "This edition is being prepared.",
    processingDescription:
      "The page images for the flipper reader are still being made. The edition opens as soon as they are ready.",
    unavailableTitle: "The reader is not available yet.",
    fullAccessLabel: "Complete edition",
    previewAccessLabel: "Free preview",
    notFoundTitle: "This edition is not on the shelf.",
    notFoundDescription:
      "The book may have been unpublished or the address changed.",
  },
  reader: {
    backLabel: "Back to the edition",
    eyebrow: "The reading room",
    freeBadge: "Free preview",
    fullBadge: "Complete edition",
    loadingLabel: "Opening the edition…",
    preparingTitle: "The edition is being prepared.",
    preparingDescription:
      "Its pages are still being rendered. Return in a moment and the reader will open.",
    unavailableTitle: "The reader could not be opened.",
    checkAgainLabel: "Check again",
    notFoundTitle: "This edition is not on the shelf.",
    notFoundDescription:
      "The book may have been unpublished or the address changed.",
    freeNoticeTitle: "You are reading the free preview.",
    freeNotice: (free: number, total: number) =>
      `${free} of ${total} pages are open to every reader. Unlock the complete edition to continue past page ${free}.`,
    unlockLabel: "Unlock the complete edition",
    fullNoticeTitle: "The complete edition is open.",
    fullNotice:
      "Every page is available to you. Return to this address whenever you wish to continue reading.",
  },
} as const;

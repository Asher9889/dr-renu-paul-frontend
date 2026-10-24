import Heading from "@tiptap/extension-heading";

export const BlogEditorHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) =>
          attributes.id ? { id: String(attributes.id) } : {},
      },
    };
  },
}).configure({ levels: [2, 3] });

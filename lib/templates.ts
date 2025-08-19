export type PosterTemplate = {
  id: string;
  name: string;
  description: string;
  previewImg?: string; // Path to preview image, optional
};

export const posterTemplates: PosterTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Clean lines and bold headlines.",
    previewImg: "/templates/classic.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Minimal and sophisticated.",
    previewImg: "/templates/modern.png",
  },
  {
    id: "afro",
    name: "Afro-Pattern",
    description: "Inspired by African art and colors.",
    previewImg: "/templates/afro.png",
  },
  {
    id: "gradient",
    name: "Gradient",
    description: "Vibrant gradient backgrounds.",
    previewImg: "/templates/gradient.png",
  },
  {
    id: "photo",
    name: "Photo-Lite",
    description: "Add your own image background.",
    previewImg: "/templates/photo.png",
  },
];
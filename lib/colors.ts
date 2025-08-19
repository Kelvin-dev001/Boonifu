export type Palette = {
  id: string;
  name: string;
  colors: {
    bg: string;
    headline: string;
    subheadline: string;
    cta: string;
    footer: string;
  };
  previewBg?: string; // For color swatch preview
};

export const palettes: Palette[] = [
  {
    id: "modern",
    name: "Modern",
    colors: {
      bg: "#F6E3B4",
      headline: "#222",
      subheadline: "#444",
      cta: "#E65C30",
      footer: "#555",
    },
    previewBg: "#F6E3B4",
  },
  {
    id: "afro",
    name: "Afro Fusion",
    colors: {
      bg: "#FFDDC1",
      headline: "#7B3F00",
      subheadline: "#C1440E",
      cta: "#F8B400",
      footer: "#222",
    },
    previewBg: "#FFDDC1",
  },
  {
    id: "night",
    name: "Night Mode",
    colors: {
      bg: "#22223B",
      headline: "#C9ADA7",
      subheadline: "#9A8C98",
      cta: "#F2E9E4",
      footer: "#4A4E69",
    },
    previewBg: "#22223B",
  },
  {
    id: "fresh",
    name: "Fresh Green",
    colors: {
      bg: "#E5F9DB",
      headline: "#1B9C85",
      subheadline: "#4B6043",
      cta: "#FFC93C",
      footer: "#393E46",
    },
    previewBg: "#E5F9DB",
  },
];
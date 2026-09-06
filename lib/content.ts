import type { WebsiteMenuCategory } from "./api";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/menu", label: "Menu" },
  { href: "/orders", label: "My Orders" },
  { href: "/gallery", label: "Gallery" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export const productFlavours = [
  {
    key: "special",
    name: "Special",
    image: "/assets/falooda-product.png",
    color: "#FB7185",
    subtle: "#FFF1F2",
    glow: "rgba(251, 113, 133, 0.4)",
  },
  {
    key: "kesar",
    name: "Kesar",
    image: "/assets/falooda-product-kesar.png",
    color: "#F59E0B",
    subtle: "#FEF3C7",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  {
    key: "pista",
    name: "Pista",
    image: "/assets/falooda-product-pista.png",
    color: "#10B981",
    subtle: "#ECFDF5",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  {
    key: "rabdi",
    name: "Rabdi",
    image: "/assets/falooda-product-rajbhog.png",
    color: "#EA580C",
    subtle: "#FFEDD5",
    glow: "rgba(234, 88, 12, 0.4)",
  },
  {
    key: "strawberry",
    name: "Strawberry",
    image: "/assets/falooda-product-strwaberry.png",
    color: "#E11D48",
    subtle: "#FFE4E6",
    glow: "rgba(225, 29, 72, 0.4)",
  },
];

export const fallbackMenu: WebsiteMenuCategory[] = [
  {
    id: "signature",
    name: "Signature Faloodas",
    items: [
      {
        id: "special",
        name: "Bombay Special Falooda",
        description:
          "Signature cup layered with falooda sev, sabja, rabdi, ice cream, milk cake and dry fruits.",
        imageUrl: "/assets/falooda-product.png",
        price: 140,
        addonGroups: [
          {
            id: "classic-addons",
            name: "Extra toppings",
            minSelect: 0,
            maxSelect: 5,
            isRequired: false,
            addons: [
              { id: "ice-cream", name: "Extra Ice Cream", price: 30 },
              { id: "rabdi", name: "Extra Rabdi", price: 25 },
              { id: "mawa", name: "Milk Cake Mawa", price: 35 },
              { id: "nuts", name: "Dry Fruits", price: 25 },
            ],
          },
        ],
      },
      {
        id: "strawberry",
        name: "Rose Strawberry Falooda",
        description: "Chilled pink strawberry milk layered with rose syrup, sabja seeds and jelly.",
        imageUrl: "/assets/falooda-product-strwaberry.png",
        price: 130,
        addonGroups: [],
      },
    ],
  },
  {
    id: "mawa",
    name: "Dry Fruit Mawa",
    items: [
      {
        id: "kesar",
        name: "Kesar Dryfruit Mawa",
        description: "Golden saffron flavoured milk, extra mawa, cashews, almonds and pistachios.",
        imageUrl: "/assets/falooda-product-kesar.png",
        price: 160,
        addonGroups: [],
      },
      {
        id: "pista",
        name: "Pista Dryfruit Mawa",
        description: "Nutty pistachio flavoured milk blend loaded with mawa and chopped pistachios.",
        imageUrl: "/assets/falooda-product-pista.png",
        price: 150,
        addonGroups: [],
      },
    ],
  },
  {
    id: "rabdi",
    name: "Rabdi Classics",
    items: [
      {
        id: "rajbhog",
        name: "Classic Rabdi Falooda",
        description: "Rich homemade rabdi blend topped with mawa, jelly cubes and ice cream scoops.",
        imageUrl: "/assets/falooda-product-rajbhog.png",
        price: 160,
        addonGroups: [],
      },
    ],
  },
];

export const galleryImages = [
  "/assets/falooda-product.png",
  "/assets/falooda-product-kesar.png",
  "/assets/falooda-product-pista.png",
  "/assets/falooda-product-rajbhog.png",
  "/assets/falooda-product-strwaberry.png",
  "/assets/Ingredients/flavoured-ice-cream.png",
  "/assets/Ingredients/flavoured-milk.png",
  "/assets/Ingredients/dry-fruits.png",
  "/assets/how-we-make/step1.png",
  "/assets/how-we-make/step4.png",
  "/assets/how-we-make/step7.png",
];

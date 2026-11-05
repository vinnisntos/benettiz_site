export type Category =
  | "Carros"
  | "Motos"
  | "Celulares"
  | "Eletrônicos"
  | "Gaming";

export type Product = {
  id: string;
  name: string;
  category: Category;
  image: string;
  /** CSS object-position, to keep the product centred in the card crop */
  focus?: string;
  note: string;
};

// Amostras provisórias: trocar pelas fotos e itens reais do catálogo.
export const featured: Product[] = [
  { id: "ducati", name: "Ducati Multistrada", category: "Motos", image: "/products/ducati-multistrada-red.jpg", focus: "45% 60%", note: "Pronta entrega" },
  { id: "bmw", name: "BMW Série 1 M Sport", category: "Carros", image: "/products/bmw-1-series-e87-hatchback-m-sport.jpg", focus: "50% 70%", note: "Importado" },
  { id: "galaxy", name: "Galaxy Z + Watch", category: "Celulares", image: "/products/smartwatch-smartphone.jpg", focus: "50% 45%", note: "Lacrado" },
  { id: "morini", name: "Moto Morini Corsaro", category: "Motos", image: "/products/2008-moto-morini-corsaro-1200.jpg", focus: "50% 65%", note: "1200 cc" },
  { id: "zik", name: "Fone Parrot Zik", category: "Eletrônicos", image: "/products/parrot-zik-headphones.jpg", focus: "25% 50%", note: "Bluetooth" },
  { id: "htc", name: "HTC One M8", category: "Celulares", image: "/products/htc-one-m8.jpg", focus: "45% 55%", note: "Seminovo" },
  { id: "ps", name: "Controle PlayStation", category: "Gaming", image: "/products/game-controller-playstation-2.jpg", focus: "75% 60%", note: "Original" },
];

export const categories = [
  "Veículos",
  "Celulares",
  "Motos",
  "Eletrônicos",
  "Gaming",
  "Importados",
  "Acessórios",
];

export const perks = [
  "Carros importados",
  "Motos esportivas",
  "iPhones & Androids",
  "Eletrônicos",
  "Gaming",
  "Acesso restrito",
  "Envios para todo o Brasil",
  "Suporte 24h",
];

export const WHATSAPP_DISPLAY = "(15) 99740-8035";
export const WHATSAPP_URL =
  "https://wa.me/5515997408035?text=" +
  encodeURIComponent("Olá! Vim pelo site da Benettiz Variedades e quero saber mais.");

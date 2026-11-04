const terms = {
  pollo: "chicken",
  carne: "beef",
  vaca: "beef",
  vacuna: "beef",
  cerdo: "pork",
  cordero: "lamb",
  pescado: "fish",
  mariscos: "seafood",
  salmon: "salmon",
  atun: "tuna",
  camarones: "prawn",
  langostinos: "prawn",
  pasta: "pasta",
  pastas: "pasta",
  fideos: "pasta",
  arroz: "rice",
  torta: "cake",
  pastel: "pie",
  tarta: "tart",
  postre: "dessert",
  sopa: "soup",
  ensalada: "salad",
  huevo: "egg",
  huevos: "egg",
  papa: "potato",
  papas: "potato",
  patatas: "potato",
  queso: "cheese",
  pan: "bread",
  hamburguesa: "burger",
  guiso: "stew",
  empanada: "pie",
  chocolate: "chocolate",
  manzana: "apple",
  limon: "lemon",
  tomate: "tomato",
  hongos: "mushroom",
  champinones: "mushroom",
  verduras: "vegetable",
  pizza: "pizza",
  curry: "curry",
};

export function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function lookupTerm(text) {
  return terms[normalize(text)] || null;
}

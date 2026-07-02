// Limpia URLs de imagen que vienen mal formateadas desde la API
// (a veces incluyen corchetes y comillas dentro del string, o apuntan a un placeholder "roto"
// que en realidad es una imagen real pero con el texto "4000x4000" o "600x400" dibujado adentro)
export function parseImage(rawUrl) {
  if (!rawUrl) return "https://placehold.co/400x400?text=Sin+imagen";

  // Saca corchetes, comillas y espacios sobrantes: ["https://..."] -> https://...
  const limpia = rawUrl.replace(/[\[\]"]/g, "").trim();

  // No es una URL válida
  if (!limpia.startsWith("http")) {
    return "https://placehold.co/400x400?text=Sin+imagen";
  }

  // Detecta placeholders de dimensiones tipo .../600/400, .../4000/4000, o algo-600x400.jpg
  const esPlaceholderDeDimensiones = /\/\d{2,5}\/\d{2,5}(\/|$)|\d{2,5}x\d{2,5}/i.test(limpia);
  if (esPlaceholderDeDimensiones) {
    return "https://placehold.co/400x400?text=Sin+imagen";
  }

  return limpia;
}
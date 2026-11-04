const EMAIL = "luciomahieu06email@gmail.com";
const MAX_LENGTH = 450;

function splitLine(line) {
  const sentences = line.match(/[^.!?]+[.!?]*\s*/g) || [line];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > MAX_LENGTH) {
      if (current) chunks.push(current);
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}
function clean(text) {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function translateChunk(text, from, to) {
  const key = `tr:${from}:${to}:${text}`;

  try {
    const cached = localStorage.getItem(key);
    if (cached) return clean(cached);
  } catch {}

  const url =
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}` +
    `&langpair=${from}|${to}&de=${EMAIL}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Falló la traducción");

  const json = await response.json();
  if (Number(json.responseStatus) !== 200)
    throw new Error("Falló la traducción");

  const result = clean(json.responseData.translatedText);
  try {
    localStorage.setItem(key, result);
  } catch {}
  return result;
}

async function translateLine(line, from, to) {
  if (!line.trim()) return line;
  const parts = await Promise.all(
    splitLine(line).map((chunk) => translateChunk(chunk, from, to)),
  );
  return parts.join(" ").trim();
}

export async function translateText(text, from = "en", to = "es") {
  if (!text || !text.trim()) return text;
  const lines = text.split("\n");
  const translated = await Promise.all(
    lines.map((l) => translateLine(l, from, to)),
  );
  return translated.join("\n");
}

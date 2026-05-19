export function formatNameLines(name = "", maxLines = 2) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  if (words.length <= maxLines) return words;

  if (maxLines === 2) {
    let bestIndex = 1;
    let bestScore = Number.POSITIVE_INFINITY;
    for (let index = 1; index < words.length; index += 1) {
      const left = words.slice(0, index).join(" ").length;
      const right = words.slice(index).join(" ").length;
      const score = Math.abs(left - right);
      if (score < bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }
    return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
  }

  const targetLength = Math.ceil(name.length / maxLines);
  const lines = [];
  let current = [];
  words.forEach((word) => {
    if (current.join(" ").length >= targetLength && lines.length < maxLines - 1) {
      lines.push(current.join(" "));
      current = [];
    }
    current.push(word);
  });
  lines.push(current.join(" "));
  return lines;
}

export function nameSizeClass(name = "") {
  const length = name.replace(/\s+/g, " ").trim().length;
  if (length > 34) return "name-compact";
  if (length > 24) return "name-balanced";
  return "name-display";
}

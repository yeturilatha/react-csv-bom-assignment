export function getHeatmapColor(value, min, max) {
  if (min === max) return "hsl(120, 70%, 85%)";

  const ratio = (value - min) / (max - min);

  // 120 = green → 60 = yellow → 0 = red
  const hue = 120 - ratio * 120;

  return `hsl(${hue}, 70%, 75%)`;
}

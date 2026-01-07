export function getPercentageDiff(supplierValue, estimatedRate) {
  if (!estimatedRate || isNaN(supplierValue)) return "";

  const diff =
    ((supplierValue - estimatedRate) / estimatedRate) * 100;

  return `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`;
}

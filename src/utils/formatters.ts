export function formatLargeNumber(num: number): string {
  return num.toLocaleString('en-US', { maximumFractionDigits: 4 });
}
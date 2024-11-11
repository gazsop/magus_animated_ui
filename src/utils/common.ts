export function getPropState(
  type: "empty" | "new" | "both",
  variable: number | string
): boolean {
  const intVar =
    typeof variable === "number" ? variable : parseInt(variable as string);
  switch (type) {
    case "empty":
      return intVar === -1;
    case "new":
      return intVar === 0;
    case "both":
      return intVar === -1 || intVar === 0;
    default:
      return false;
  }
}

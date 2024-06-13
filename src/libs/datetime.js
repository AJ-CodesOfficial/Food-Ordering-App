export function dbTimeForHuman(str) {
  let date;

  date = new Date(str).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return date.replace(",", "");
}

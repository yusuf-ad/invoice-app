import date from "date-and-time";

export function formatDate(newDate) {
  return date.format(newDate, "D MMM YYYY");
}

import date from "date-and-time";

export function formattedDate(newDate) {
  return date.format(newDate, "D MMM YYYY");
}

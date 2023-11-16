export default function extractDateFromString(dateTimeString) {
  const datePart = dateTimeString?.slice(0, 10);
  return datePart;
}

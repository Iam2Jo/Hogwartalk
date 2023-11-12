export default function cutStringAfterColon(inputString: string) {
  const result = inputString.split(':')[1].trim();
  return result;
}

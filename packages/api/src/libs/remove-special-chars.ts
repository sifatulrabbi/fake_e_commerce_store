export function removeSpecialChars(str: string) {
  // prettier-ignore
  const chars = ["/", "|", "<", ">", ";", "{", "}", "=", "?", "!", "$", "'", '"', "*", "^", "(", ")"];

  let modStr = str;

  let i = 0;
  while (i < chars.length) {
    while (modStr.includes(chars[i])) {
      modStr = modStr.replace(chars[i], "");
    }

    while (modStr.includes("%")) {
      modStr = modStr.replace("%", " ");
    }

    i++;
  }

  return modStr;
}

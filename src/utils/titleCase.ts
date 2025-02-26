export const titleCase = (value: string) => {
  return value.toLocaleLowerCase().split(" ").map((word) => {
    return word.replace(word[0], word[0].toLocaleUpperCase());
  }).join(" ");
}

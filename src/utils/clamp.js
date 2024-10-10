export const clamp = (text, maxLine = 2, maxCharPerLine = 30) => {
  let currentCharCount = 0;
  let lineCount = 0;
  let result = "";
  let words = text.split(" ");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (currentCharCount + word.length + 1 <= maxCharPerLine) {
      result += word + " ";
      currentCharCount += word.length + 1;
    } else {
      result = result.trim() + "<br />";
      result += word + " ";
      currentCharCount = word.length + 1;
      lineCount++;

      if (lineCount >= maxLine - 1) {
        const remainingWords = words.slice(i + 1).join(" ");
        const truncatedRemaining = remainingWords.slice(
          0,
          maxCharPerLine - currentCharCount
        );

        result += truncatedRemaining.trim() + "...";
        break;
      }
    }
  }

  return result.trim();
};

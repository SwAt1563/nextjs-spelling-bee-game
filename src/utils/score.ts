function calculateScore(word: string): number {
  const wordLength = word.length;
  if (wordLength <= 4) {
    return 1;
  }

  return wordLength;
}

export { calculateScore };

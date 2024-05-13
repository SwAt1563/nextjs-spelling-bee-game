function isWordInList(word: string, listOfWords: string[]): boolean {
    return listOfWords.includes(word.toLowerCase());
}

export { isWordInList };
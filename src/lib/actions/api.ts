"use server";

import { calculateScore  } from "@/utils/score";

interface Dictionary {
  [key: string]: string[];
}

interface Result {
  key: string;
  chosenCharacters: string[];
  filteredWords: string[];
}

function getScore(words: string[]): number {
  let totalScore = 0;

  for (const word of words) {
    totalScore += calculateScore(word)
  }

  return totalScore;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function processDictionary(dict: Dictionary): Result | null {
  const keys = Object.keys(dict);
  if (keys.length === 0) return null;

  // choose random key character from the dictionary
  const key = randomElement(keys);
  // get the list of words for the chosen key character
  const words = dict[key];
  let uniqueChars = new Set<string>();

  // Collect unique characters from the words list
  words.forEach((word) => {
    for (const char of word) {
      if (char !== key) {
        uniqueChars.add(char);
      }
    }
  });

  // Convert to array and shuffle to pick random characters
  let charArray = Array.from(uniqueChars);
  if (charArray.length < 6) return null; // Ensure we have at least 6 unique characters to choose from

  // Randomly pick 6 unique characters excluding the key character
  const chosenChars: string[] = [];
  while (chosenChars.length < 6) {
    const randomChar = randomElement(charArray);
    if (randomChar !== key && !chosenChars.includes(randomChar)) {
      chosenChars.push(randomChar);
    }
  }

  // Filter words to include only those containing all selected characters plus the key
  const requiredChars = new Set<string>([key, ...chosenChars]);
  const filteredWords = words.filter((word) => {
    const wordChars = Array.from(new Set(word.split("")));
    for (const char of wordChars) {
      if (!requiredChars.has(char)) return false;
    }
    return true;
  });

  if (filteredWords.length === 0) return null;

  return {
    key,
    chosenCharacters: chosenChars,
    filteredWords,
  };
}

export async function getData(lang: string) {
  // Initialize an empty object to hold the dictionary data
  let data = {}
  try {
    data = (await import(`@/dictionaries/${lang}.json`)).default;
  } catch (error) {
    console.error("Failed to load dictionary data", error);
    return null;
  }

  let result: null | Result = null;
  // Loop until the result has valid data processed by the processDictionary function
  while (!result) {
    result = processDictionary(data);
  }

  // Calculate the maximum score for the filtered words from the result
  const maxScore = getScore(result.filteredWords);

  // Prepare the response object with data to be returned
  const response = {
    key: result.key,
    chosenCharacters: result.chosenCharacters,
    characters: [result.key].concat(result.chosenCharacters),
    words: result.filteredWords,
    maxScore,
  };

  return response;
}

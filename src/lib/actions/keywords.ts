"use server";

export async function getKeywords(lang: string) {
  const messages = (await import(`@/../messages/${lang}.json`)).default;
  return messages["Game"];
}

import { cookies } from "next/headers";
import { getData } from "@/lib/actions/api";
import Spelling from "./(components)/Spelling";
import { getKeywords } from "@/lib/actions/keywords";

type GameData = {
  lang: string;
  keywords: Record<string, any>;
  key: string;
  chosenCharacters: string[];
  characters: string[];
  words: string[];
  maxScore: number;
};

const fetchData = async (lang: string, keywords: Record<string, string>) => {
  try {
    const response = await getData(lang);
    const data = { lang, keywords, ...response } as GameData;

    return data;
  } catch (error) {
    throw new Error("The Server is not responding");
  }
};
export default async function Game() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const keywords = await getKeywords(lang);

  const data = await fetchData(lang, keywords);

  return (
    <>
      <div className="containe text-center">
        <div className="container-fluid my-3 text-center">
          <Spelling data={data} />
        </div>
      </div>
    </>
  );
}

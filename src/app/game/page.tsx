import { useTranslations } from "next-intl";
import Link from "next/link";
import { cookies } from "next/headers";
import { getData } from "@/lib/actions/api";
import Spelling from "./(components)/Spelling";

type GameData = {
  lang: string;
  keywords: Record<string, string>;
  key: string;
  chosenCharacters: string[];
  characters: string[];
  words: string[];
  maxScore: number;
};

const fetchData = async (lang: string, keywords: Record<string, string>) => {
  try {
    const response = await getData(lang);
    const data = { lang, keywords, ...response} as GameData;

    return data;
  } catch (error) {
    throw new Error("The Server is not responding");
  }
};
export default async function Game() {
  //   const t = useTranslations("Language");
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";

  const keywords = {
    score: "Your Score",
    maxScore: "Max Score",
    timer: "Timer",
    placeholder: "Type or click",
    deleteButton: "Delete",
    enterButton: "Enter",
  };

  const data = await fetchData(lang, keywords);

  return (
    <>
      {/* <h1 className="container">
        <p>{t("title")}</p>
      </h1> */}

      <div className="containe text-center">
        <div className="container-fluid my-3 text-center">
          <Spelling data={data} />
        </div>
      </div>
    </>
  );
}

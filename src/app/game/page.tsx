import { useTranslations } from "next-intl";
import Link from "next/link";
import { cookies } from "next/headers";
import { getData } from "@/lib/actions/api";
import Spelling from "./(components)/Spelling";

const fetchData = async (lang: string) => {
  try {
    const data = await getData(lang);
    return data;
  } catch (error) {
    throw new Error("The Server is not responding");
  }
};
export default async function Game() {
  //   const t = useTranslations("Language");
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";

  //   const data = await fetchData(lang);
  //   console.log(data);

  return (
    <>
      {/* <h1 className="container">
        <p>{t("title")}</p>
      </h1> */}

      <div className="containe text-center">
        <div className="container-fluid my-3 text-center">
          <Spelling />
        </div>
      </div>
    </>
  );
}

import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import GameResults from "./(components)/GameResults";

export default async function End() {
  const locale = await getLocale();
  //   const t = useTranslations("Language");

  return (
    <>
      {/* <h1 className="container">
        <p>{t("title")}</p>
      </h1> */}

      <div className="container my-5">
        <GameResults />
      </div>
    </>
  );
}

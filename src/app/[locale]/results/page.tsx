import { getTranslations } from "next-intl/server";
import GameResults from "./(components)/GameResults";

export default async function End() {
  const t = await getTranslations("Results");

  const content = {
    title: t("title"),
    score: t("score"),
    words: t("words"),
    success: t("success"),
    true: t("true"),
    false: t("false"),
    time: t("time"),
  };

  return (
    <>
      <div className="container my-5">
        <GameResults content={content} />
      </div>
    </>
  );
}

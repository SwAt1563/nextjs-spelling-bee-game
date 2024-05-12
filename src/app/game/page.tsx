import { useTranslations } from "next-intl";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Game() {
  //   const t = useTranslations("Language");
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    <>
      {/* <h1 className="container">
        <p>{t("title")}</p>
      </h1> */}

      <div className="containe text-center">
        <div className="container-fluid px-4 py-5 my-5 text-center">
          <h1>Game</h1>
          {lang}
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Language");

  return (
    <>
      <h1 className="container">
        <p>{t("title")}</p>
      </h1>
    </>
  );
}

import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="footer w-100 text-center bg-dark text-white p-3 mt-auto">
      <div className="text-center p-3">
        {t("title")}:
        <Link
          href="https://swat1563.github.io/my-cv/"
          target="_blank"
          className="text-warning"
        >
          {" "}
          Qutaiba Olayyan
        </Link>
      </div>
    </footer>
  );
}

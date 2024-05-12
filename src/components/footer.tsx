import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  //   const t = useTranslations('Footer');

  return (
    <footer className="footer w-100 text-center bg-dark text-white p-3 mt-auto">
      <div className="text-center p-3">
        © 2024 Copyright:
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

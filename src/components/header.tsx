import { useTranslations } from "next-intl";
import Link from "next/link";
import LocalSwitcher from "./local-switcher";
import Image from "next/image";
import { getLocale } from "next-intl/server";

export default async function Header() {
  //   const t = useTranslations("Navigation");
  const lang = await getLocale();

  return (
    <header className="header-section">
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">
          <Link href={`/${lang}`} passHref className="navbar-brand">
            <div className="d-flex align-items-center">
              <Image src="/Logo.png" alt="" width={100} height={100} />
              <h4 className="text-warning m-0 ms-2  d-none d-md-block">
                Spelling Bee Game
              </h4>
            </div>
          </Link>

          <div>
            <LocalSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}

{
  /* <header className='p-4'>
      <nav className='flex items-center justify-between'>
        <Link href='/'>{t('home')}</Link>
        <LocalSwitcher />
      </nav>
    </header> */
}

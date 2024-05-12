import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();

  // const t = useTranslations("Language");

  return (
    <>
      {/* <h1 className="container">
        <p>{t("title")}</p>
      </h1> */}

      <div className="containe text-center">
        <div className="container-fluid px-4 py-5 my-5 text-center">
          <div className="lc-block col-lg-6 mx-auto">
            <div>
              <p className="lead ">Spell, Score, Shine</p>
            </div>
          </div>
          <div className="lc-block">
            <div>
              <h2 className="fw-bold display-2">Master Your Spelling Skills</h2>
            </div>
          </div>
          <div className="lc-block col-lg-6 mx-auto mb-4">
            <div>
              <p className="lead ">
                Dive into the world of words with our interactive spelling
                challenges. Start your journey to becoming a spelling champion
                today!
              </p>
            </div>
          </div>
          <div className="lc-block d-block mx-auto mb-4">
            <Link className="glightbox" href={`/${locale}/instructions`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7em"
                height="7em"
                viewBox="0 0 16 16"
                lc-helper="svg-icon"
                className="text-warning svg-icon"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

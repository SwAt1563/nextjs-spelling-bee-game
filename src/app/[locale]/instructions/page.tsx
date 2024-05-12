import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { BiSolidInfoCircle } from "react-icons/bi";
import ModelButton from "@/components/ModelButton";

export default async function Instructions() {
  const locale = await getLocale();
  //   const t = useTranslations("Language");

  return (
    <>
      {/* <h1 className="container">
        <p>{t("title")}</p>
      </h1> */}

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="mb-4 text-center">Game Instructions</h1>
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item text-warning">
                  <BiSolidInfoCircle className="me-2" /> <strong>Scores</strong>
                  <ul className="text-dark">
                    <li>
                      {" "}
                      Earn 1 point for each word consisting of 3 or 4 letters.
                    </li>
                    <li>
                      {" "}
                      Words containing 5 or more letters yield points equal to
                      the number of letters in the word.
                    </li>
                  </ul>
                </li>
                <li className="list-group-item text-warning">
                  <BiSolidInfoCircle className="me-2" />{" "}
                  <strong>Restrictions</strong>
                  <ul className="text-dark">
                    <li>
                      {" "}
                      Every word you form must include the designated central
                      letter.
                    </li>
                  </ul>
                </li>
                <li className="list-group-item text-warning">
                  <BiSolidInfoCircle className="me-2" />{" "}
                  <strong>Benefits</strong>
                  <ul className="text-dark">
                    <li>
                      {" "}
                      Feel free to use any letter multiple times within a single
                      word to craft your answers.
                    </li>
                  </ul>
                </li>
                <li className="list-group-item text-warning">
                  <BiSolidInfoCircle className="me-2" /> <strong>Time</strong>
                  <ul className="text-dark ">
                    <li>Each game starts with a countdown of one minute.</li>
                    <li>
                      Successfully spelling a correct word awards an additional
                      15 seconds.
                    </li>
                    <li>
                      The game ends when the timer expires or if a player
                      achieves the maximum score possible.
                    </li>
                  </ul>
                </li>

                <li className="list-group-item text-warning">
                  <BiSolidInfoCircle className="me-2" />{" "}
                  <strong>Warning</strong>
                  <ul className="text-dark">
                    <li>
                      {" "}
                      Once the game starts, the language setting cannot be
                      changed.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <ModelButton />
          </div>
        </div>
      </div>
    </>
  );
}

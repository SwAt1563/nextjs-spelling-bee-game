import { getTranslations } from "next-intl/server";
import { BiSolidInfoCircle } from "react-icons/bi";
import ModelButton from "@/components/ModelButton";

export default async function Instructions() {
  const t = await getTranslations("Instructions");
  const tModel = await getTranslations("Instructions.model");

  const modelContent = {
    title: tModel("title"),
    body: tModel("body"),
    cancelButton: tModel("cancelButton"),
    startButton: tModel("startButton"),
    startGameButton: tModel("startGameButton"),
  };

  const list = t.raw("list");

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="mb-4 text-center">{t("title")}</h1>
            <div className="card shadow-sm">
              <ul className="list-group list-group-flush list-unstyled">
                {list.map((item: any, index: number) => (
                  <li key={index} className="list-group-item text-warning">
                    <BiSolidInfoCircle className="me-2" />{" "}
                    <strong>{item.title}</strong>
                    <ul className="text-dark">
                      {item.points.map((point: string, pointIndex: number) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <ModelButton content={modelContent} />
          </div>
        </div>
      </div>
    </>
  );
}

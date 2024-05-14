"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import LoadingComponent from "@/components/Loading";

import "./GameResults.css";
interface GameResults {
  success: boolean;
  score: number;
  maxScore: number;
  numberOfWords: number;
  totalNumberOfWords: number;
  minutes: number;
  seconds: number;
}

const GameResults = ({ content }: { content: Record<string, string> }) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const results = localStorage.getItem("results");
      if (!results) {
        router.push("/");
        return;
      }

      try {
        const parsedData = JSON.parse(results) as GameResults;
        setData({
          ...parsedData,
          scorePercentage: (parsedData.score / parsedData.maxScore) * 100,
          wordPercentage:
            (parsedData.numberOfWords / parsedData.totalNumberOfWords) * 100,
        });
      } catch (error) {
        console.error("Failed to parse game results from localStorage", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle-y">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      <Container className="mt-5">
        <h1 className="text-center">{content.title}</h1>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h2>
              {content.score}: {data.score} / {data.maxScore}
            </h2>
            <progress max="100" value={data.scorePercentage} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <h3>
              {content.words}: {data.numberOfWords} / {data.totalNumberOfWords}
            </h3>
            <progress max="100" value={data.wordPercentage} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <h4>
              {content.success}:{" "}
              <span className={data.success ? "text-success" : "text-danger"}>
                {data.success ? content.true : content.false}
              </span>
            </h4>
            <h5>
              {content.time}: {data.minutes}:{data.seconds}
            </h5>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GameResults;

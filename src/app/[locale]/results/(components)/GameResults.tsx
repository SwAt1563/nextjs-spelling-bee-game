"use client";

// components/GameResults.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import LoadingComponent from "@/components/Loading";

interface GameResults {
  success: boolean;
  score: number;
  maxScore: number;
  numberOfWords: number;
  totalNumberOfWords: number;
  minutes: number;
  seconds: number;
}

const GameResults = () => {
  const [data, setData] = useState<GameResults | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = () => {
      const results = localStorage.getItem("results");
      if (!results) {
        router.push("/");
        return;
      }

      try {
        const parsedData = JSON.parse(results) as GameResults;
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse game results from localStorage", error);
        router.push("/");
      }
    };

    fetchData();
  }, [router]);

  if (!data) {
    return (
      <div className="position-fixed top-50 start-50 translate-middle-y">
        <LoadingComponent />
      </div>
    );
  }

  const {
    success,
    score,
    maxScore,
    numberOfWords,
    totalNumberOfWords,
    minutes,
    seconds,
  } = data;
  const scorePercentage = (score / maxScore) * 100;

  return (
    <Container className="mt-5">
      <h2 className="text-center">Last Game Results</h2>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>
            Score: {score} / {maxScore}
          </h2>
          <ProgressBar now={scorePercentage} variant="warning" />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <h3>
            Words: {numberOfWords} / {totalNumberOfWords}
          </h3>
          <ProgressBar
            now={(numberOfWords / totalNumberOfWords) * 100}
            variant="warning"
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <h4>
            Success:{" "}
            <span className={success ? "text-success" : "text-danger"}>
              {success ? "Yes" : "No"}
            </span>
          </h4>

          <h5>
            Time Taken: {minutes} minute{minutes > 1 ? "s" : ""} and {seconds}{" "}
            second{seconds > 1 ? "s" : ""}
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default GameResults;

"use client";

import "./Spellings.css";

import React, { useRef, useEffect } from "react";
import Beehive from "@/components/beehive/Beehive";
import { useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { shuffleList } from "@/utils/shuffle";
import CircularProgress from "@mui/joy/CircularProgress";

const Spelling = () => {
  const [word, setWord] = useState("");
  const [score, setScore] = useState(66);
  const [otherChars, setOtherChars] = useState(["A", "B", "C", "D", "E", "F"]);
  const [matchingWords, setMatchingWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const keyChar = "G";
  const maxScore = 100;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [word]);

  const handleWriteChar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWord(value.toLocaleUpperCase());
  };

  const handleDelete = () => {
    if (word.length > 0) {
      setWord(word.slice(0, -1));
    }
  };

  const handleShuffle = () => {
    setOtherChars((prev) => shuffleList(prev));
  };

  const handleEnter = () => {
    if (word && !matchingWords.includes(word)) {
        setMatchingWords(prevWords => [...prevWords, word]);
        setWord("");
      }

  };

  return (
    <>
      <div className="container text-center">
        <div className="bg-white rounded-lg p-5 shadow text-center mb-3">
          <h2 className="h6 font-weight-bold text-center mb-4">Your Score</h2>

          <CircularProgress
            size="lg"
            determinate
            value={(score / maxScore) * 100}
            sx={{ "--CircularProgress-size": "100px" }}
            // color="success"
          >
            {score}
          </CircularProgress>

          <div className="row text-center mt-2">
            <div className="col-6 border-right">
              <div className="h4 font-weight-bold mb-0">{maxScore}</div>
              <span className="small text-gray">Max Score</span>
            </div>
            <div className="col-6">
              <div className="h4 font-weight-bold mb-0 ">
                <div className="timer-container">
                  <span>00</span>
                  <span>:</span>
                  <span>00</span>
                </div>
              </div>
              <span className="small text-gray">Timer</span>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            ref={inputRef}
            className="input-field text-center w-100"
            value={word}
            onChange={(e) => handleWriteChar(e)}
            placeholder="Type or click"
          />
        </div>
        <Beehive
          keyChar={keyChar}
          otherChars={otherChars}
          addChar={(char: string) => setWord((prev) => prev + char)}
        />
        <div className="d-flex justify-content-center my-3">
          <button
            className="btn click-btn mx-2 px-4 rounded-pill"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn click-btn mx-2 rounded-circle"
            onClick={handleShuffle}
          >
            <BsArrowRepeat />
          </button>
          <button
            className="btn click-btn mx-2 px-4 rounded-pill"
            onClick={handleEnter}
          >
            Enter
          </button>
        </div>
        {/* Matching Words Display */}
        <div className="matching-words-container">
          {matchingWords.map((word, index) => (
            <div key={index} className="matching-word">{word}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Spelling;

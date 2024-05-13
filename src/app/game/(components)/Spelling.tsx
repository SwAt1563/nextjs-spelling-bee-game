"use client";

import "./Spellings.css";

import React, { useRef, useEffect } from "react";
import Beehive from "@/components/beehive/Beehive";
import { useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { shuffleList } from "@/utils/shuffle";
import CircularProgress from "@mui/joy/CircularProgress";
import { useRouter } from "next/navigation";
import { convertSecondsToMinutes } from "@/utils/time";
import { isWordInList } from "@/utils/validation";
import { calculateScore } from "@/utils/score";

type GameData = {
  lang: string;
  keywords: Record<string, string>;
  key: string;
  chosenCharacters: string[];
  characters: string[];
  words: string[];
  maxScore: number;
};

type SpellingProps = {
  data: GameData;
};

const saveResults = (
  score: number,
  maxScore: number,
  totalMatchingWords: number,
  totalNumberOfWords: number,
  totalTime: number,
  success: boolean
) => {
  const { minutes, remainingSeconds } = convertSecondsToMinutes(totalTime);

  const results = {
    success,
    score,
    maxScore,
    numberOfWords: totalMatchingWords,
    totalNumberOfWords,
    minutes,
    seconds: remainingSeconds,
  };
  localStorage.setItem("results", JSON.stringify(results));
};

const Spelling: React.FC<SpellingProps> = ({ data }) => {
  const [word, setWord] = useState("");
  const [matchingWords, setMatchingWords] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>(data.words);
  const [otherChars, setOtherChars] = useState<string[]>(data.chosenCharacters);

  const [score, setScore] = useState(0);

  const [timer, setTimer] = useState(59);
  const [totalTime, setTotalTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const keywords = data.keywords as Record<string, string>;

  useEffect(() => {
    let notificationTimer: ReturnType<typeof setTimeout> | undefined;
    if (showNotification) {
      // Hide the notification after 2 seconds
      notificationTimer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
    return () => {
      if (notificationTimer) clearTimeout(notificationTimer);
    };
  }, [showNotification]);

  
  useEffect(() => {
    if (timer <= 0) {
      saveResults(
        score,
        data.maxScore,
        matchingWords.length,
        data.words.length,
        totalTime,
        false
      );
      router.push(`/${data.lang}/results`);
      return;
    }

    const timerId = setInterval(() => {
      setTotalTime((prev) => prev + 1);
      setTimer((prevSeconds) => prevSeconds - 1);
      const { minutes, remainingSeconds } = convertSecondsToMinutes(timer);
      setMinutes(minutes);
      setSeconds(remainingSeconds);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer, router]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [word]);

  const handleWriteChar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();

   
    if (!data.characters.includes(value.charAt(value.length - 1))) {
      return;
    }
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
    const input = word.toLocaleLowerCase();
    console.log(`Hint: ${words}`);

    if (input.length < 3) {
      setNotificationText("Too short");
      setShowNotification(true);
      return;
    } else if (!isWordInList(input, words)) {
      setNotificationText("Not a valid word");
      setShowNotification(true);
      return;
    } else {
      setNotificationText("Correct! +15 seconds");
      setShowNotification(true);

      const newScore = score + calculateScore(input);
      setScore(newScore);
      setTimer((prevSeconds) => prevSeconds + 15);
      const { minutes, remainingSeconds } = convertSecondsToMinutes(timer);
      setMinutes(minutes);
      setSeconds(remainingSeconds);
      setMatchingWords((prevWords) => [...prevWords, input]);
      setWords((prevWords) => prevWords.filter((w) => w !== input));
      setWord("");
    }
  };

  useEffect(() => {
    if (score === data.maxScore) {
      saveResults(
        score,
        data.maxScore,
        matchingWords.length,
        data.words.length,
        totalTime,
        true
      );
      router.push(`/${data.lang}/results`);
    }
  }, [score]);

  return (
    <>
      <div className="container text-center">
        <div className="position-relative bg-white rounded-lg p-5 shadow text-center mb-3">
          {showNotification && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px",
              }}
              className="bg-dark text-white rounded text-center"
            >
              {notificationText}
            </div>
          )}

          <h2 className="h4 font-weight-bold text-center mb-4">
            {keywords["score"]}
          </h2>

          <CircularProgress
            size="lg"
            determinate
            value={(score / data.maxScore) * 100}
            sx={{ "--CircularProgress-size": "100px" }}
            // color="success"
          >
            {score}
          </CircularProgress>

          <div className="row text-center mt-2">
            <div className="col-6 border-right">
              <div className="h4 font-weight-bold mb-0">{data.maxScore}</div>
              <span className="small text-gray">{keywords["maxScore"]}</span>
            </div>
            <div className="col-6">
              <div className="h4 font-weight-bold mb-0 ">
                <div className="timer-container">
                  <span>{minutes}</span>
                  <span>:</span>
                  <span>{seconds}</span>
                </div>
              </div>
              <span className="small text-gray">{keywords["timer"]}</span>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            ref={inputRef}
            className="input-field text-center w-100"
            value={word}
            onChange={(e) => handleWriteChar(e)}
            placeholder={keywords["placeholder"]}
          />
        </div>
        <Beehive
          keyChar={data.key}
          otherChars={otherChars}
          addChar={(char: string) => setWord((prev) => prev + char)}
        />
        <div className="d-flex justify-content-center my-3">
          <button
            className="btn click-btn mx-2 px-4 rounded-pill"
            onClick={handleDelete}
          >
            {keywords["deleteButton"]}
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
            {keywords["enterButton"]}
          </button>
        </div>
        {/* Matching Words Display */}
        <div className="matching-words-container">
          {matchingWords.map((word, index) => (
            <div key={index} className="matching-word">
              {word}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Spelling;

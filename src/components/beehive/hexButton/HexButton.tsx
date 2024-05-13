import React from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import styles from "./Hexagon.module.css";

interface HexButtonProps {
  char: string;
  isKey?: boolean;
  addChar: (value: any) => void; // Define the type for the onClick function
}

const HexButton: React.FC<HexButtonProps> = ({
  char,
  isKey = false,
  addChar,
}) => {
  const handleClick = () => {
    addChar(char.toLocaleUpperCase());
  };

  const iconClassName = isKey ? "text-warning" : "text-dark";

  return (
    <div className={styles.hexagon} onClick={handleClick}>
      <BsFillHexagonFill className={iconClassName} size={100} />
      <span className={styles.hexNumber}>{char.toLocaleUpperCase()}</span>
    </div>
  );
};

export default HexButton;

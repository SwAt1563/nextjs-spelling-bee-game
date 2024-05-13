// Beehive.tsx
import React from "react";
import HexButton from "./hexButton/HexButton";

interface BeehiveProps {
  keyChar: string;
  otherChars: string[];
  addChar: (value: string) => void;
}

const Beehive: React.FC<BeehiveProps> = ({ keyChar, otherChars, addChar }) => {
  return (
    <div className="text-center">
      <div className="d-flex justify-content-center">
        <HexButton char={otherChars[0]} addChar={addChar} />
        <HexButton char={otherChars[1]} addChar={addChar} />
      </div>
      <div className="d-flex justify-content-center">
        <HexButton char={otherChars[2]} addChar={addChar} />
        <HexButton char={keyChar} isKey={true} addChar={addChar} />
        <HexButton char={otherChars[3]} addChar={addChar} />
      </div>
      <div className="d-flex justify-content-center">
        <HexButton char={otherChars[4]} addChar={addChar} />
        <HexButton char={otherChars[5]} addChar={addChar} />
      </div>
    </div>
  );
};

export default Beehive;

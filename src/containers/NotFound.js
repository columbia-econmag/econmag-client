import React, { useState } from "react";
import "./NotFound.css";
const Tetris = require("react-tetris");

export default function NotFound() {
  const [ClickCount, setClickCount] = useState(0);
  window.addEventListener(
    "keydown",
    function (e) {
      // space and arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    },
    false
  );
  return (
    <>
      <div className="NotFound">
        <h3 onClick={() => setClickCount(ClickCount + 1)}>
          Sorry, page is under construction :( check again soon!
        </h3>
      </div>
      {ClickCount > 2 ? (
        <div className="holdTet">
          <div className="Width">
            <h1>Hey! Play some Tetris (:</h1>
            <Tetris style={{ display: "flex" }}>
              {({ Gameboard, PieceQueue, points, linesCleared }) => {
                // Render it however you'd like
                return (
                  <div style={{ display: "flex" }}>
                    <div>
                      <p>Points: {points}</p>
                      <p>Lines Cleared: {linesCleared}</p>
                    </div>
                    <Gameboard />
                    <PieceQueue />
                  </div>
                );
              }}
            </Tetris>
          </div>
        </div>
      ) : null}
    </>
  );
}

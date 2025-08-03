import "./App.css";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [stringOfWords, setStringOfWords] = useState("");
  const [charsTyped, setCharsTyped] = useState(-1); // Stores the index upto which the chars have been typed
  const [timeElapsed, setTimeElapsed] = useState(0); // Stores time in seconds
  const [isTimerTicking, setIsTimerTicking] = useState(false);

  const clearInput = () => (document.getElementById("input").value = "");

  const handleKeyStroke = (event) => {
    const key = event.nativeEvent.data;
    if (key != null) {
      if (charsTyped == -1) setTimeElapsed(0);
      setIsTimerTicking(true);
      if (key == stringOfWords[charsTyped + 1]) {
        setCharsTyped((charsTyped) => charsTyped + 1);
      }
      if (charsTyped + 2 == stringOfWords.length) setIsTimerTicking(false);
    }

    if (charsTyped + 1 == stringOfWords.length) {
      clearInput();
    }
  };

  const refreshWords = useCallback(() => {
    fetch(`https://random-word-api.herokuapp.com/word?number=10`)
      .then((res) => res.json())
      .then((data) => setStringOfWords(data.join(" ")));

    setCharsTyped(-1);
    clearInput();
    setIsTimerTicking(false);
  }, []);

  useEffect(() => {
    refreshWords();
  }, [refreshWords]);

  useEffect(() => {
    const interval = setInterval(() => {
      isTimerTicking && setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeElapsed, isTimerTicking]);

  return (
    <div className="container">
      <img 
        src="/app-reading-logo.png" 
        alt="App Reading Logo" 
        className="logo"
      />
      <h1>Professional Typing Speed Tester</h1>
      
      <div className="words-display">
        {stringOfWords || "Loading words..."}
      </div>
      
      <button className="refresh-button" onClick={refreshWords}>
        Generate New Words
      </button>
      
      <div className="stats">
        {timeElapsed == 0
          ? "0"
          : Math.round(((charsTyped + 1) / timeElapsed) * 12)}{" "}
        WPM
      </div>
      
      <input
        id="input"
        onChange={(e) => handleKeyStroke(e)}
        className="input-field"
        type="text"
        placeholder="Start typing here..."
      />
    </div>
  );
}

export default App;


import { useState } from 'react';



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    console.log(replace);
    if (replace) {
     history.pop()
    }
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }
  console.log(history);
  console.log(mode);
  return { mode, transition, back };
}
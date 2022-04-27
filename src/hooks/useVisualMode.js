import { useState } from 'react';



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition between different modes when buttons clicked
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      return setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    }
    return setHistory(prev => [...prev, newMode]);
  }

  //goes back to previous component
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}
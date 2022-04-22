import { useState } from 'react';



export default function useVisualMode(initialValue) {
  const [mode, setMode] = useState(initialValue);
  const [history , setHistory] = useState([initialValue])
  
  function transition(updateMode) {
    setMode(updateMode)
  }

  function back() {

  }

  return { mode, transition, back };
}
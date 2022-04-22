import { useState } from 'react';



export default function useVisualMode(initialValue) {
  const [mode, setMode] = useState(initialValue);
  
  function transition(updateMode) {
    setMode(updateMode)
  }

  return { mode, transition };
}
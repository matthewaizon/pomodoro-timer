import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(52)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState(0)

  useEffect(() => {
    let interval

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0 && minutes > 0) {
            return 59
          } 
          else if (prevSeconds === 0 && minutes === 0) {
            return 0
          } 
          else {
            return prevSeconds - 1
          }
        })

        setMinutes((prevMinutes) => {
          if (seconds === 0) {
            if (prevMinutes === 0 && seconds === 0) {
              clearInterval(interval)
              setIsActive(false)
              return 0
            }
            return prevMinutes > 0 ? prevMinutes - 1 : 0
          }
          return prevMinutes
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, seconds])

  const start = () => setIsActive(true)
  
  const stop = () => setIsActive(false)

  const reset = (prevMode = mode) => {
    stop()
    if (prevMode == 0) {
      setMinutes(52)
    } else if (prevMode == 1) {
      setMinutes(17)
    }
    setSeconds(0)
  }

  const switchMode = () => {
    const newMode = mode === 0 ? 1 : 0
    setMode(newMode)
    reset(newMode)
  }
  
  const formatSeconds = String(seconds).padStart(2, '0')
  const formatMinutes = String(minutes).padStart(2, '0')

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <h2>{formatMinutes}:{formatSeconds}</h2>
      <h3>{mode}</h3>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={switchMode}>Switch Mode</button>
    </div>
  )
}

export default App

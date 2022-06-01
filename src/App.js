import { useEffect, useState } from "react";
import { Task } from "./Task";
function App() {

const [level, setLevel] = useState(1)
const [currentTask, setTask] = useState('Reload')
const [checksLeft, setChecks] = useState(3)
const [userAnswer, setUserAnswer] = useState('')



useEffect(()=>{
  function taskCreator(){
    const number1 =Math.floor( Math.random()*100*level)
    const number2 =Math.floor( Math.random() * 10 * level)
    return new Task(`${number1} + ${number2}`, number1+number2)
  }
setTask(taskCreator())
},[level]
)
function checkAnswer(){
  userAnswer === currentTask.answer.toString() ? setLevel(level=>level+1): 
  setChecks(checks=> checks - 1)
  setUserAnswer('')
}
  return (
    <div className="App">
    <header className="header">
      <nav>
        <ul className="navbar">
          <li>
            Level: {level} 
          </li>
        </ul>
      </nav>
    </header>
    <div className="taskContainer">
    <div>{currentTask.taskBody}</div>
    <form className="taskForm">
      <input className="taskInput" value={userAnswer} onChange={(e)=>{setUserAnswer(e.target.value)}}>
      </input>
      <button onClick={checkAnswer} type="button" className="taskButton">
        Check
      </button>
      Checks left: {checksLeft}
    </form>
    </div>
    </div>
  );
}

export default App;

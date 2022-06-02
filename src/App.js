import { useEffect, useRef, useState } from "react";
import { Notification } from "./Notification";
import { Task } from "./Task";
function App() {

const [level, setLevel] = useState(1)
const [currentTask, setTask] = useState({})
const [checksLeft, setChecks] = useState(3)
const [userAnswer, setUserAnswer] = useState('')
const [notification, setNotification] = useState('')
const input = useRef()



useEffect(()=>{
  function taskCreator(){
    const number1 = Math.floor( Math.random()*100*level)
    const number2 = Math.floor( Math.random() * 10 * level)
    return new Task(`${number1} + ${number2}`, number1+number2)
  }
setTask(taskCreator())
},[level]
)
function notificationCreator(type,text){
  
  return new Notification(type,text)
 
}

function lose(){
  setLevel(1)
  setUserAnswer('')
  setChecks(3)
  setNotification(notificationCreator('error', `Очень жаль, у тебя не осталось попыток, игра начинается заново, удачи! `)) 

}

function checkAnswer(){
  
  input.current.focus()
  if (userAnswer === '') return
  
 if(userAnswer === currentTask.answer.toString()){
  setNotification(notificationCreator('success', 'Отлично! Продолжай в том же духе!'))
  setUserAnswer('')
 return setLevel(level=>level+1)
 }

 if(checksLeft===0){
  
  return lose()

 }  
  setChecks(checks=> checks - 1)
  setNotification(notificationCreator('error', `Очень жаль, но ты ошибся, у тебя осталось ${checksLeft - 1} проверок`)) 
  
  
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
    <div className={notification.type}>
      {notification.text}
      </div>
    <div>{currentTask.taskBody}</div>
    <form className="taskForm">
      <input ref={input} className="taskInput" value={userAnswer} onChange={(e)=>{setUserAnswer(e.target.value)}}>
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

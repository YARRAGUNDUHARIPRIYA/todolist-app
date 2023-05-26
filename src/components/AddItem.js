/*import { createContext,useContext,useState } from "react"
const TodoContext=createContext()
const initialTodoListState=["Todo List"];
const TodoProvider=({children})=>{
    const [todoList,setTodoList]=useState(initialTodoListState)
    const getNoOfTodoItems=()=>todoList.length;
    const addTodoItem=(newItem)=>{
        setTodoList([...todoList,newItem])
    }
    const ContextValue={
        todoList,
        getNoOfTodoItems,
        addTodoItem 
    }
    return(
        <TodoContext.Provider value={ContextValue}>{children}</TodoContext.Provider>
    );
};

export const useTodoContext=()=>useContext(TodoContext);
export default TodoProvider;*/
//import TimePicker from './TimePicker'
//import parseInt from Math
import React, { useState } from "react";
import moment from "moment";
import "./MyStyleSheet.css";
import styled from "styled-components";

const InputTextContainer = styled.input.attrs({type:'text'})`
  height:3rem;
  width:100%;
  border-radius:0.5rem;
  border:1px dotted #E5E5FF;
  &:focus{
    background-color: #E5E5FF;
    
  }
`;

const InputTimeContainer = styled.input.attrs({type:'time'})`
  height:3rem;
  width:100%;
  border-radius:0.5rem;
  border:1px dotted #E5E5FF;
  &:focus{
    background-color: #E5E5FF;
    
  }
`;

const AddItem = (props) => {
  const { itemList, setItemList, noOfItems, setShowAnotherPage } = props;
  //console.log(items);
  const [task, addTask] = useState("");
  const [due, addDue] = useState("");

  const handleAddTask = (e) => {
    addTask(e.target.value);
  };
  const handleAddDue = (e) => {
    addDue(e.target.value);
    var flag = 1;
    const time = moment().format("HH mm ");
    var currentTime = time.split(" ");
    var specifiedTime = e.target.value.split(":");
    if (parseInt(currentTime[0]) > parseInt(specifiedTime[0])) {
      window.alert("Enter valid time!");
      flag = 0;
    } else if (parseInt(currentTime[0]) == parseInt(specifiedTime[0])) {
      if (parseInt(currentTime[1]) >= parseInt(specifiedTime[1])) {
        window.alert("Enter valid Time!");
        flag = 0;
      }
    }
    if (flag == 0) {
      addDue(0);
    }

    //window.alert(due)
  };
  const handleClick = (e) => {
    e?.preventDefault();
    console.log(itemList, noOfItems);
    if (task.length < 1) {
      window.alert("Please enter some task!");
    } else if (due != 0) {
      let updated = [...itemList, { task, due }];
      setItemList(updated);

      {
        localStorage.setItem("prevArray", JSON.stringify(updated));
      }
    }
    document.getElementById("textId").focus();
    addTask("");
    addDue("");
  };

  return (
    <div className="addItemContainer">
      {/*<div>{noOfItems}</div>*/}
      <div className="textInput">
        <label>Task:</label>
        <InputTextContainer
          type="text"
          value={task}
          id="textId"
          name="task"
          placeholder="Enter task"
          autoFocus
          onChange={handleAddTask}
        />
      </div>
      <div className="textInput">
        <label>Time:</label>
        <InputTimeContainer type="time" value={due} name="time" onChange={handleAddDue} />
      </div>
      <div className="buttonSpace">
        <ButtonContainer id="add" onClick={(e) => handleClick()} >
          Add
        </ButtonContainer>
      </div>
    </div>
  );
};
export default AddItem;
{/*${(props) => {props.disabled?0.8:1}}; */}
const ButtonContainer = styled.button`
  width: 4rem;
  text-align: center;
  height: 2rem;
  align-items: self-end;
  
  transition-timing-function:ease-out;
  background-color: #8888ff;
  opacity:0.6 
  border: #8888ff;
  border-radius: 1rem;
  &:hover {
    width: 6rem;
    transition: width 1.5s;
  }
  &:focus{
    opacity:1;
    background-color: #8888ff
  }
`;

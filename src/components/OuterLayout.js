import React, { useState, useEffect } from "react";
import "./MyStyleSheet.css";
import moment from "moment";
import AddItem from "./AddItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faAngleUp,faAngleDown } from '@fortawesome/free-solid-svg-icons'


/*export const TodoListContext=createContext();
export const timeContext=React.createContext()
export const functContext=React.createContext() */
const OuterLayout = ({ children }) => {
  const [itemList, setItemList] = useState([]);
  var count=0;

  useEffect(() => {
    setItemList(JSON.parse(localStorage.getItem("prevArray")) || []);
  }, []);

  const [showAnotherPage, setShowAnotherPage] = useState(false);
  const [deleteFLag,setDeleteFlag]=useState(false);
  const [sortDirection, setSortDirection]=useState("DSC")
  const handleClick = () => {
    //toggle(this);
    setShowAnotherPage(true);
  };
  const noofItems = () => {
    return itemList.length;
  };
  // const [temp,setTemp]=useState([]);
  const sortItems=(sortDir)=>{
    var temp;
    if(sortDir=="ASC")
    {
      temp=([...itemList].sort((a, b) =>a.task > b.task ? 1 : -1,));
    }
    else if(sortDir=="DSC")
    {
      temp=([...itemList].sort((a, b) =>a.task > b.task ? -1 : 1,));
    }
    console.log(temp)
    return temp;
  }
  const handleSort=()=>{
      setSortDirection(sortDirection === "ASC"?"DSC":"ASC");
      console.log(sortDirection);
      setItemList(sortItems(sortDirection));
      //console.log({temp});
      {localStorage.setItem('prevArray', JSON.stringify(itemList))}
    
  }
  const format=(due)=>{
    var splitDue=due.split(":");
    var hrs=parseInt(splitDue[0]);
    console.log(hrs);
    var mins=parseInt(splitDue[1]);
    if(hrs<12)
    {
      return hrs.toString()+":"+mins.toString()+"AM";
    }
    return (hrs-12).toString()+":"+mins.toString()+"PM";
  }
  const handleDelete=(taskToBeDeleted)=>{
     console.log(taskToBeDeleted);
     const filteredTasks=itemList.filter((item)=>{
        console.log(item,taskToBeDeleted); 
        return (item?.task!==taskToBeDeleted);
     })
     setItemList(filteredTasks);
     {localStorage.setItem('prevArray', JSON.stringify(filteredTasks))}

     console.log("filteredItems", filteredTasks);
     //console.log("itemList", itemList);
  }
  //const varItems=items.map(item)=>(<li>{item}</li>)
  //
  
  return (
    <div className="OuterContainer">
      <div className="todayButtonStyle">
          <div className="todayStyle">{moment().format("dddd Do MMMM ")}</div>
          <div className="imageEvent">
            {!showAnotherPage ? (
              <img
                className="style1 imgStyle my-img"
                src="./add-button.png"
                alt=""
                onClick={() => handleClick()} 
              />
            ) : null}
          </div>
        </div>
      <div className="withRemaining">
        <div className="addItemSpace"><h3> tasks remained :{noofItems()}</h3>
        {showAnotherPage && (
          <AddItem
            setShowAnotherPage={setShowAnotherPage}
            setItemList={setItemList}
            itemList={itemList}
            noOfItems={noofItems}
          />
        )}
      </div>
      </div>

      {/*items={items} addItem={addItem} time={moment().format('hh:mm:ss')}*/}
      <div className="tableStyle">
        <table>
          <tr>
            <th>S.No</th>
            <th> 
              <div className="faStyle">Task Name 
              {<FontAwesomeIcon  icon={sortDirection === 'ASC' ? faAngleUp : faAngleDown } onClick={handleSort}> </FontAwesomeIcon>}</div>
              {/* <div><FontAwesomeIcon  icon={faAngleDown}> </FontAwesomeIcon></div> */}
              <div></div>
            </th>
            <th>Due Time</th>
            <th>del</th>
          </tr>
          {
          itemList.length > 0 &&
            itemList.map((item) => (
              <tr >
                      <td>{++count}</td>
                      <td>{item.task}</td>
                      <td>{format(item.due)}</td>
                      <td><img className="style1" src="./trash-solid.svg" alt="" onClick={()=>handleDelete(item.task)}/></td>
                  
              </tr>
         ))}
        </table>
        </div>
      </div>

  );
};
export default OuterLayout;

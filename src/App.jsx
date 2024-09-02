import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Title from './components/Title'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const savetoLS = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const [newTodo, setnewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState("");
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
    }
    
  }, [])
  window.addEventListener('beforeunload',savetoLS);
  const handleAdd = async() => { 
    if(newTodo.length){
    setTodos([...todos,{value: newTodo,isCompleted:false,key:uuidv4(),isEdit:false}]);
    setnewTodo("");
    
    savetoLS();
    }
   }
  const handleChange = (e) => { 
    setnewTodo(e.target.value)
   }
  const handleChangedit = (e) => { 
    setEditText(e.target.value)
   }
   const handleEdit = (e) => { 
    setTodos(todos.map(item=>{
      if(item.key == e.target.id){
        return ({value: item.value, isCompleted:item.isCompleted,key:item.key,isEdit:true})
      }
      return ({value: item.value, isCompleted:item.isCompleted,key:item.key,isEdit:false})
    }))
      setEditText(todos.filter(item=>{
        return item.key == e.target.id
      })[0].value)
      console.log(editText);
      savetoLS();
    }
  const handleDelete = (e) => { 
     const newarray = todos.filter(item=>{
      return item.key != e.target.id
     });
     setTodos(newarray);
     console.log(e.target.id);
     savetoLS();
   }
   const handleSave = (e) => { 
    
    setTodos(todos.map(item=>{
      if(item.key == e.target.id){
        return ({value: editText, isCompleted:item.isCompleted,key:item.key,isEdit:false})
      }else{
      return {value: item.value, isCompleted:item.isCompleted,key:item.key,isEdit:item.isEdit}}
    }))
    setEditText("")
    }
    const handlekeyDown = (e)=>{
      if(e.key === 'Enter'){
        
          handleAdd();
        
        
      }
      savetoLS();
    }
    const handleComplete = (e)=>{
      setTodos(todos.map(item=>{
        if(item.key == e.target.id){
          return ({value: item.value, isCompleted:!item.isCompleted,key:item.key,isEdit:false})
        }else{
        return {value: item.value, isCompleted:item.isCompleted,key:item.key,isEdit:item.isEdit}}
      }))
      savetoLS();
    }
    
  return (
    <>
      <Navbar/>
      <div className="main">
        <div className="inputDiv">
          <input type="text" value={newTodo} name='Add' onChange={handleChange} onKeyDown={handlekeyDown}/>
          <button onClick={handleAdd}>Add</button>
          
        </div>
        <div className="todos">
          {todos.length?todos.map(item=>{
            return(<div className="todo" key={item.key}>
            {item.isCompleted?<input type="checkbox" id={item.key} onChange={handleComplete} checked/>:<input type="checkbox" id={item.key} onChange={handleComplete} />}
            {item.isEdit && <input type="text" name='edit' autoFocus onKeyDown={handlekeyDown} onFocus={(e)=>{e.target.select()}} className="editbox" value={editText} onChange={handleChangedit}/>}
          {!item.isEdit && (item.isCompleted?<span className='text' style={{textDecoration:"line-through"}}>{item.value}</span>:<span className='text'>{item.value}</span>)}
          {item.isEdit && <button onClick={handleSave} id={item.key}>Save</button>}
          {!item.isEdit && <button onClick={handleEdit} id={item.key}>Edit</button>}
        <button onClick={handleDelete} id={item.key}>Delete</button>
          </div>)
          }):"No task to display"}
          
        </div>
        
      </div>
    </>
  )
}

export default App

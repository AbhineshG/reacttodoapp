 import { useEffect, useState } from 'react';
 import Preloader from './component/preloader'
import { craeteTodos, readTodos, updateTodo,deleteTodo} from './functions';
function App() {
const [todo,setTodo]=useState({title:"",content:""})
const [todos,setTodos]=useState(null)
const [currentId,setCurrentId]=useState(0)

useEffect(() => {
 let currentTodo = currentId !==0 ?todos.find(todo=>todo._id===currentId):{title:"",content:""}
 setTodo(currentTodo)
},[currentId])

  useEffect(() => {
    const fetchData = async()=>{
      const result = await readTodos();
      setTodos(result)
    }
    fetchData()
  },[currentId])
  
  const clear=()=>{
    setCurrentId(0);
    setTodo({title:"",content:""})
  }
  useEffect(() => {
    const clearField = (e)=>{
 if(e.keyCode === 27){
clear() 
}
    }
    window.addEventListener('keydown',clearField)
return()=> window.addEventListener('keydown',clearField)
   }, [])

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    if(currentId === 0){
      const result = await craeteTodos(todo)
      setTodos([...todos,result])
      setTodo({title:"",content:""})
    }else{
      const result = await updateTodo(currentId,todo)
      setTodos([...todos,result])
      setTodo({title:"",content:""})
      window.location.reload(false);
    }
}

const removeTodo=async(id)=>{
await deleteTodo(id);
const todosCopy=[...todos];
todosCopy.filter(todo=>todo._id !==id);
setTodos(todosCopy);
window.location.reload(false);

}

  return (
    <div className="container">
  <div className="row">
    <form className="col s12" onSubmit={onSubmitHandler}>
      <div className="row">
        <pre>{JSON.stringify(todo)}</pre>
        <div className="input-field col s6">
          <label> Title </label>
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" className="validate" 
          value={todo.title}
          onChange={e=>setTodo({...todo,title:e.target.value})}
          />
         </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">description</i>
          <input id="description" type="tel" className="validate" 
           value={todo.content}
                    onChange={e=>setTodo({...todo,content:e.target.value})}
                    />
          <label>Content </label>
         </div>
        <div className='row right-align'>
<button className='waves-effect waves-light btn'> Submit </button>
        </div>
      </div>
    </form>
    {!todos?<Preloader />:todos.length>0?
    <ul className="collection">
      {todos.map(todo=>(
  <li key={todo._id} className="collection-item">
    <div><h5>{todo.title} </h5> 
   <p> {todo.content} 
    <a href="#!" className="secondary-content">
    <i className="material-icons dp48" onClick={()=>setCurrentId(todo._id)}>edit</i>
     <i className="material-icons dp48" onClick={()=>removeTodo(todo._id)}>delete</i>
      </a>
      </p> 
      </div>
      </li>
  ))}
       
      </ul>:<div><h4> Nothing Found </h4></div>}
    
    </div>
</div>

  );
}

export default App;

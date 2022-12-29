import ToDo from "./ToDo";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../lib/baseReducer";
import { clearTodo } from "../lib/baseReducer";
import { v4 as uuidv4 } from 'uuid';


function TodoList() {
    const [input,setInput] = useState('')
    const [activeTab,setActiveTab] = useState('All')
    let myTodos = useSelector(state=>state.todos)
    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
        if (e.key == 'Enter') {
            const myid = uuidv4()
            dispatch(addTodo({id:myid,content:input,isActive:false}))
            setInput('')
        }
    }
    let listOfTodos = []
    if (activeTab == 'Active') {
        listOfTodos = myTodos.todos.filter(el => {return !el.isActive})
    } else if (activeTab == 'Completed') {
        listOfTodos = myTodos.todos.filter(el => {return el.isActive})
    } else {
        listOfTodos = myTodos.todos
    } 

    console.log(listOfTodos, 'list')
    return ( 
        <>
            <div className="w-full flex flex-col">
                <label htmlFor="todo" className="mx-auto text-xl mt-[6rem] text-black opacity-70">Add To Do...</label>
                <input onChange={(e)=>{setInput(e.target.value)}}
                       onKeyDown={(e)=>{handleSubmit(e)}} 
                       className="mx-auto w-5/12 bg-sky-50 h-[2.5rem] rounded-md shadow-md shadow-black text-black" 
                       type="text" 
                       name="todo" 
                       value={input || ''} 
                />
            </div>
            <div className="w-8/12 flex flex-row justify-around mx-auto mt-4">
                <button name="All" 
                        onClick={(e)=>{setActiveTab(e.target.name)}} 
                        className={activeTab == 'All' ? "text-lg text-slate-500 bg-indigo-200 border-r-2 w-full rounded-l-md" : "text-lg text-slate-500 border-r-2 w-full rounded-l-md"} 
                        type="button">
                            All
                </button>
                <button name="Active" 
                        onClick={(e)=>{setActiveTab(e.target.name)}}    
                        className={activeTab == 'Active' ? "text-lg text-slate-500 bg-indigo-200 border-r-2 w-full rounded-l-md" : "text-lg text-slate-500 border-r-2 w-full rounded-l-md"} 
                        type="button">
                            Active
                </button>
                <button name="Completed" 
                        onClick={(e)=>{setActiveTab(e.target.name)}} 
                        className={activeTab == 'Completed' ? "text-lg text-slate-500 bg-indigo-200 border-r-2 w-full rounded-l-md" : "text-lg text-slate-500 border-r-2 w-full rounded-l-md"} 
                        type="button">
                            Completed
                </button>
                <button type="button"
                        onClick={()=>{dispatch(clearTodo())}}
                        className="text-lg text-slate-500 border-r-2 w-full rounded-l-md active:bg-indigo-200">
                        Clear All
                </button>
            </div>
            <ul className="h-full border-2">
            {
                listOfTodos.length > 0 && listOfTodos.map((it,id)=>{
                    return (
                        <li key={id}>
                            <ToDo it={it} />
                        </li>
                    )
                })
            }
            </ul>
        </>
     );
}

export default TodoList;
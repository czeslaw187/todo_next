import ToDo from "./ToDo";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../lib/baseReducer";


function TodoList() {
    const [input,setInput] = useState('')
    const [activeTab,setActiveTab] = useState('All')
    const myTodos = useSelector(state=>state.todos)
    const dispatch = useDispatch()

    const handleSubmit =(e) =>{
        e.preventDefault()
        if (e.target.key == 'Enter') {
            dispatch(addTodo(input))
        }
        setInput('')
    }

    console.log(myTodos, 'slice')
    return ( 
        <>
            <div className="w-full flex flex-col mt-auto">
                <label htmlFor="todo" className="mx-auto text-xl text-black opacity-70">Add To Do...</label>
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
            </div>
            <ToDo />
        </>
     );
}

export default TodoList;
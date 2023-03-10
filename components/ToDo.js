import { useSelector, useDispatch } from "react-redux";
import { changeActive } from "../lib/baseReducer";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTodo } from "../lib/baseReducer";

function ToDo({it}) {
    const dispatch = useDispatch()
    
    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }

    return ( 
        <>
            <div className="w-8/12 h-[3rem] border-2 border-lime-500 shadow-lg shadow-black rounded-md mx-auto mt-1 flex flex-row justify-start items-center">                                                                  
                <button type="button"
                        className={it && it.isactive ? "w-7 h-7 ml-3 bg-green-400 rounded-full" : "w-7 h-7 ml-3 bg-white rounded-full"}
                        onClick={()=>{dispatch(changeActive(it.todo_id, it.isactive))}}>
                            {it && it.isactive ? <FontAwesomeIcon icon={faCheck} /> : null}
                </button>
                <div className={it && it.isactive ? "ml-5 line-through text-gray-500" : "ml-5 text-slate-700"}>
                    {it && it.content}
                </div>
                <div className="ml-auto mr-3 text-black font-bold">
                    <button className="transition duration-500 ease-out hover:scale-125" 
                            type="button"
                            onClick={()=>{handleDelete(it.todo_id)}}>X</button>
                </div>
            </div>
        </>
     );
}

export default ToDo;


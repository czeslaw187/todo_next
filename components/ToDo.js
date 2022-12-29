import { useSelector, useDispatch } from "react-redux";
import { changeActive } from "../lib/baseReducer";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToDo({it}) {
    const dispatch = useDispatch()

    return ( 
        <>
            <div className="w-8/12 h-[3rem] border-2 border-lime-500 shadow-lg shadow-black rounded-md mx-auto mt-1 flex flex-row justify-start items-center">                                                                  
                <button type="button"
                        className={it.isActive ? "w-7 h-7 ml-3 bg-green-400 rounded-full" : "w-7 h-7 ml-3 bg-white rounded-full"}
                        onClick={()=>{dispatch(changeActive(it))}}>
                            {it.isActive ? <FontAwesomeIcon icon={faCheck} /> : null}
                </button>
                <div className={it.isActive ? "ml-5 line-through text-gray-500" : "ml-5 text-slate-700"}>
                    {it.content}
                </div>
            </div>
        </>
     );
}

export default ToDo;


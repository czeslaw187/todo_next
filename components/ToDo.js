import { useSelector, useDispatch } from "react-redux";
import { changeActive } from "../lib/baseReducer";

function ToDo({it}) {
    console.log(it, 'it')
    const dispatch = useDispatch()

    return ( 
        <>
            <div className="w-8/12 h-[3rem] border-2 border-lime-500 shadow-lg shadow-black rounded-md mx-auto mt-1 flex flex-row justify-between items-center">                                                                  
                <button type="button"
                        className={it.isActive ? "w-7 h-7 ml-3 bg-green-400 rounded-full" : "w-7 h-7 ml-3 bg-white rounded-full"}
                        onClick={()=>{dispatch(changeActive(it))}}>
                </button>
            </div>
        </>
     );
}

export default ToDo;


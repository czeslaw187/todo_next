import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { addUser } from "../lib/baseReducer";
import { useSelector, useDispatch } from "react-redux";

function Subscribe() {
    const {data:session} = useSession()
    const router = useRouter()
    const myUser = useSelector(state=>state.todos.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!session) {
            router.push('/')
        }
    },[session])

    useEffect(()=>{
        dispatch(addUser(session?.user))
    },[])
    
    console.log(myUser, 'session')

    return ( 
        <div className="h-full flex">
            <div className="mx-auto mt-[9rem] w-4/12 h-[10rem] border-2 rounded-md shadow-md shadow-white flex flex-col">
                <div className="text-slate-700 text-lg mx-auto mt-4">
                    You have to subscribe to use this service
                </div>
                <button type="button" className="text-center text-slate-600 font-bold p-2 w-5/12 rounded-md border-none bg-lime-500 mx-auto mt-5 hover:bg-lime-300 active:shadow-inner active:shadow-black">Subscribe</button>
            </div>
        </div>
     );
}

export default Subscribe;
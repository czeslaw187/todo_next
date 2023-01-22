import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearTodo } from "../lib/baseReducer";
function NavBar() {
    const dispatch = useDispatch()
    const router = useRouter()
    const {data: session} = useSession()

    return ( 
        <div className="w-full h-[5rem] border-2 rounded-t-md bg-gradient-to-br from-sky-100 to-indigo-300 flex flex-row justify-between items-center">
            <a className="text-3xl text-black mx-3" href="#">ToDo</a>
            <button onClick={session ? ()=>{signOut(); dispatch(clearTodo())} : ()=>{signIn()}} className="text-2xl text-black hover:opacity-50 active:opacity-100 mx-3" type="button">{session ? 'Sign Out' : 'Sign In'}</button>
        </div>
     );
}

export default NavBar;
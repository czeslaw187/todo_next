import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import TodoList from "../components/TodoList";
import { fetchUser } from "../lib/baseReducer";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const dispatch = useDispatch()
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push(process.env.NEXT_PUBLIC_URL + '/')
        } else {
            dispatch(fetchUser(session.session.user.name, session.session.user.email))
        }
    }, [session])

    const user = useSelector(state => state.todos.user)
    
    useEffect(()=>{
        if (user[0]?.subscription < Date.now()) {
            router.push('/subscribe')
        }
    },[])
    
    return (
        <div className="h-full flex flex-col">
            <TodoList session={session} />
        </div>
    )
}

export default Home;
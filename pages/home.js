import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import TodoList from "../components/TodoList";

function Home() {
    const {data: session} = useSession()
    const router = useRouter()
    useEffect(()=>{
        if (!session) {
            router.push('/')
        }
    },[session])
    return ( 
        <div className="h-full flex flex-col">
            <TodoList />
        </div>
     );
}

export default Home;
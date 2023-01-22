import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Success() {
    const {data:session} = useSession()
    const router = useRouter()
    const dispatch = useDispatch()
    
    if (!session) {
        router.push('/')
    } else {
        setTimeout(()=>{
            router.push('/home')
        },3000)
    }

    useEffect(()=>{
        const duration = Date.now() + 30*86400000
        const email = session.session.user.email
    },[session])

    return ( 
        <div className="h-full flex">
            <div className="m-auto w-[10rem] h-[10rem] bg-lime-200 items-center text-center text-4xl">
                Success!!
            </div>
        </div>
     );
}

export default Success;
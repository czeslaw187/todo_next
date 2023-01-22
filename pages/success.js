import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { subscribeState } from '../lib/baseReducer'

function Success() {
    const {data:session} = useSession()
    const router = useRouter()

    useEffect(()=>{
        if (!session) {
            router.push('/')
        }    
        setTimeout(()=>{
            router.push('/home')
        },5000)     
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
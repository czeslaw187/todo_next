import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Success() {
    const {data:session} = useSession()
    const router = useRouter()
    
    if (!session) {
        router.push('/')
    }

    return ( 
        <div className="h-full flex">
            <div className="m-auto w-[10rem] h-[10rem] bg-lime-200 items-center text-center text-4xl">
                Success!!
            </div>
        </div>
     );
}

export default Success;
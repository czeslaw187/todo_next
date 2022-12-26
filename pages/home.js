import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Home() {
    const {data: session} = useSession()
    const router = useRouter()
    useEffect(()=>{
        if (!session) {
            router.push('/')
        }
    },[session])
    return ( 
        <div>
            HOME
        </div>
     );
}

export default Home;
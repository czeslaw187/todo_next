import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

function Subscribe() {
    const {data:session} = useSession()
    const router = useRouter()
    
    useEffect(()=>{
      if (!session) {
        router.push('/')
      }
    },[])
    
    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.get('/api/create-stripe-session');
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
      };
    
    return ( 
        <div className="h-full flex">
            <div className="mx-auto mt-[9rem] w-4/12 h-[10rem] border-2 rounded-md shadow-md shadow-white flex flex-col">
                <div className="text-slate-700 text-lg mx-auto mt-4">
                    You have to subscribe to use this service
                </div>
                <button type="button" 
                        onClick={createCheckOutSession}
                        className="text-center text-slate-600 font-bold p-2 w-5/12 rounded-md border-none bg-lime-500 mx-auto mt-5 hover:bg-lime-300 active:shadow-inner active:shadow-black">Subscribe</button>
            </div>
        </div>
     );
}

export default Subscribe;
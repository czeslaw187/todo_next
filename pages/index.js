import { Inter } from '@next/font/google'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

function Index() {
  const {data:session} = useSession()
  const router = useRouter()
  useEffect(()=>{
    if (session) {
      router.push('/subscribe')
    }
  },[session])
  return ( 
    <div className='h-full flex'>
      <p className='m-auto text-red-500 opacity-50 text-7xl'>to do...</p>
    </div>
   );
}

export default Index;

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Home() {
  return ( 
    <div className='h-full flex'>
      <p className='m-auto text-red-500 opacity-50 text-7xl'>to do...</p>
    </div>
   );
}

export default Home;

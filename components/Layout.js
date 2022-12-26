function Layout({children}) {
    return ( 
        <>
        <div className='w-screen h-screen bg-gradient-to-br from-indigo-100 to-indigo-500'>
            {children}
        </div>
        </>
     );
}

export default Layout;
function NavBar() {
    return ( 
        <div className="w-full h-[5rem] border-2 rounded-t-md bg-gradient-to-br from-sky-100 to-indigo-300 flex flex-row justify-between items-center">
            <a className="text-3xl text-black mx-3" href="#">ToDo</a>
            <button className="text-2xl text-black hover:opacity-50 active:opacity-100 mx-3" type="button">Sign in</button>
        </div>
     );
}

export default NavBar;
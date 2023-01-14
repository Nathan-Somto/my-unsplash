import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/unsplash_logo.svg";
import Button from "./Button";
import { UserContext } from "../App";
export default function Navbar() {
  const currentUser: any = useContext(UserContext);
  function handleLogout(){
    localStorage.removeItem('token');
    console.log('clicked');
    window.location.reload(false);
  }
  return (
    <nav className="flex items-center justify-between w-full h-24 p-4">
      <div className=' sm:ml-3'>
        <img src={logo} alt="my-unsplash logo" />
      </div>
      <div className=" w-4/6 sm:w-2/4">
        <input
          type={"text"}
          placeholder="search unsplash"
          className=" w-full  p-3 rounded-3xl
           transition ease-in border border-solid border-gray-400
            outline-black bg-gray-200 focus:border-gray-600"
        />
      </div>
      <div className="relative  bottom-0 left-0 flex justify-center items-center md:hidden ">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mx-auto my-0 justify-self-end"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </div>
  {
    !currentUser.user && 
    <div className=' hidden md:block '>
    <Link to={'/login'} className='mr-2'>Login</Link>
    <Link to={'/register'}>Register</Link>
    </div>
  }
   {
    currentUser.user && 
    <div className=' hidden md:block '>
    <Link to={`/profile/${currentUser.user}`} className='mr-4'>{currentUser.user}</Link>
    <Button styles={'py-1  px-2'} OnClick={handleLogout}>{'Logout'}</Button>
    </div>
  }
    </nav>
  );
}

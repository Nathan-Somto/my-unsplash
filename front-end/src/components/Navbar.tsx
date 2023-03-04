import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Imodal } from "../pages/Profile";
import logo from "../assets/unsplash_logo.svg";
import Button from "./Button";
import { UserContext } from "../App";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

type props = {
  openModal?: (value: Imodal) => void;
};
export const getPathname = () => useLocation().pathname;

export default function Navbar({ openModal }: props) {
  const currentUser: any = useContext(UserContext);

 
  const handleModal = () => {
    if (!openModal) {
     return;
    }
    openModal((prevState)=>({...prevState,  photoModal: true }));
  };

  function handleLogout() {
    localStorage.removeItem("token");
    console.log("clicked");
    window.location.reload(false);
  }
  
  return (
    <nav className="flex items-center justify-between w-full h-24 p-4">
      <div className=" sm:ml-3">
        <img src={logo} alt="my-unsplash logo" />
      </div>
      <div className=" w-4/6 sm:w-2/4 relative">
        <input
          type={"text"}
          placeholder="search unsplash"
          className=" w-full  p-3 rounded-3xl
           transition ease-in border border-solid border-gray-400
            outline-black bg-gray-200 focus:border-gray-600"
        />
       {/*  <AiOutlineSearch size={20} color={'black'} className='absolute right-0 top-0'/> */}
      </div>
      
      {getPathname() === "/profile/:username"  || "/profile" ? (
            <div className="flex items-center justify-center ">
               <AiOutlineUser size={40} className={'rounded-full text-[rgba(100,100,100,0.5)] border border-solid border-black/50 md:mr-[0.65rem] lg:mr-[1.5rem]'}/>
              <Button OnClick={handleModal}  styles={'md:block hidden bg-white border border-solid  relative border-[rgba(100,100,100,0.5)] text-black px-5 py-[0.45rem] fw-200'} >{"New photo"}</Button>
            </div>
          ) : (
            ""
          )}
      
      {!currentUser.user && (
        <div className=" hidden md:block ">
          <Link to={"/login"} className="mr-2">
            Login
          </Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
      {currentUser.user && (
        <div className=" hidden md:block ">
                    {getPathname() === "/profile/:username"  || "/profile" ? (
            <>
              <p>user profile icon</p>
              <Button OnClick={handleModal}>{"add a New photo"}</Button>
            </>
          ) : (
            ""
          )}
          <Link to={`/profile/${currentUser.user}`} className="mr-4">
            {currentUser.user}
          </Link>
          <Button styles={"py-1  px-2"} OnClick={handleLogout}>
            {"Logout"}
          </Button>

        </div>
      )}
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
       {/* mobile menu items go here  */}
    </nav>
  );
}

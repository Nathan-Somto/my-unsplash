import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Imodal } from "../pages/Profile";
import logo from "../assets/unsplash_logo.svg";
import Button from "./Button";
import { UserContext } from "../App";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

type props = {
  openModal?: (value: Imodal) => void;
};
export default function Navbar({ openModal }: props) {
  const [mobileNav , setMobileNav] = useState(false);
  const currentUser: any = useContext(UserContext);
const getPathname = () => useLocation().pathname;
  
 
  const handleModal = () => {
    if (!openModal) {
     return;
    }
    openModal((prevState)=>({...prevState,  photoModal: true }));
  };

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload(false);
  }
  
  return (
    <>
    <nav className="flex items-center justify-between w-full h-24 p-4">
      <div className=" sm:ml-3">
        <img src={logo} alt="my-unsplash logo" />
      </div>
      <div className=" w-4/6 sm:w-2/4  relative z-1 top-0 ">
      <div className='absolute left-0 top-0 p-3'>
         <AiOutlineSearch size={20} color={'rgb(100,100,100)'} /> 
      </div>
        <input
          type={"text"}
          placeholder="search unsplash"
          className=" w-full  p-3 rounded-3xl
           transition ease-in border border-solid border-gray-400
            outline-black bg-[rgba(190,190,190,0.55)] focus:border-gray-600 text::placeholder-pl-3"
        />
      
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
  <div onClick={()=> setMobileNav(true)} className={` flex justify-center items-center md:hidden ${mobileNav ?'opacity-0':'opacity-100'} `}>
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
       {/* login register  search users new photo */}
   
    </nav>
    {mobileNav &&   <div className={'flex bg-[rgba(90,90,90)] flex-col text-white justify-between absolute top-[2rem] z-[50] max-w-[250px] w-[55%] min-w-[200px] h-[205px] text-center right-[5%]  shadow-md rounded-md '}>
  <div onClick={()=> setMobileNav(prevState => !prevState)} className="absolute right-0 top-0 p-1">
        <FaTimes size={15} color={"black"}/>
      </div>
      <div className="flex flex-col  text-center   h-[150px] p-[1.2rem] items-center mb-[1.2rem]">
       <Link to={"/login"} className="mr-2 mb-[1.2rem]">
            Login
          </Link>
          <Link to={"/register"}>Register</Link>
          </div>
          <div>
          <hr className="bg-[rgba(20,20,20,0.754)]" />
        <Button OnClick={handleModal}  styles={'mx-auto my-4  bg-white w-[80%] border border-solid  relative border-[rgba(100,100,100,0.5)] text-black px-5 py-[0.55rem] fw- text-[0.85rem]'} >{"New photo"}</Button>
       </div>
       </div>
       }
    </>
  );
}

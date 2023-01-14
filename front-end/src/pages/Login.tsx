import React, { useContext,  useEffect } from "react";
import { useState } from "react";
import {Link , useNavigate }  from 'react-router-dom';
import Button from "../components/Button";
import authUser from "../services/authUser";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../assets/unsplash_logo.svg";
import { UserContext } from "../App";
type Props = {};
type stateObj = {
  email: string;
  password: string;
};
export default function login({}: Props):JSX.Element {
  const [formData, setFormData] = useState<stateObj>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>('');
  const currentUser: any = useContext(UserContext);
  const Navigate = useNavigate();
  let handleChange : (e:React.ChangeEvent<HTMLInputElement>)=> void;
  handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value);
    if(e.target){ 
    setFormData({
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    });
  }}
  function handleRedirect():void{
    Navigate('/');
    console.log('clicked')
  }
 async function handleSubmit(e:any){
    e.preventDefault();
    // validate the form
    console.log(formData);
    try{
      const username = await authUser(formData,'login');
    }
    catch(err){
      
      
    }
  }
  return (
    <>
      <section className="flex  flex-col items-center  min-h-screen ">
      {error &&<div className="w-full fixed h-16  font-xl font-bold text-white bg-red-500 text-center"><p className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>{error}</p><AiOutlineClose size={20} className=" absolute right-0  bottom-2/4 cursor-pointer"/></div>}
        <div className="text-center">
          <img alt="unsplash logo" onClick={handleRedirect} src={logo} className='mx-auto cursor-pointer mt-2 mb-4 h-16'/>{" "} 
          {/*add an onclick to redirect to home page*/}
          <h1 className="text-bold text-3xl font-bold mb-4">Login</h1>
          <h3>Welcome back</h3>
        </div>
        <form className="mt-12 p-4 w-3/4 mx-auto mb-0 max-w-xl min-w-fit" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="block mt-4 mb-2 ">
              Email
            </label>
            <input
              type={"text"}
              name="email"
              onChange={handleChange}
              id="email"
              className="p-2 w-full border-black/50 focus:border-black border-solid border"
            />
          </div>
          <div className="flex flex-col mt-4 mb-4">
            <label htmlFor="password" className="block  mb-2">
              Password
            </label>
            <input
              type={"password"}
              name="password"
              onChange={handleChange}
              id="password"
              className="p-2 w-full border-black/50 focus:border-black border-solid border"
            />
          </div>
          <Button styles={' w-full '}>{"Login"}</Button>
          <div className="mt-8 text-center">Don't have an account?  <Link to={'/register'} className='underline text-black/50'>Join Unsplash</Link></div>
        </form>
      </section>
    </>
  );
}

import React from "react";
import { useState } from "react";
import {Link , useNavigate }  from 'react-router-dom';
import Button from "../components/Button";
import logo from "../assets/unsplash_logo.svg";
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
  const Navigate = useNavigate();
  let handleChange : (e:React.ChangeEvent<HTMLInputElement>)=> void;
  handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
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
  return (
    <>
      <section className="flex  flex-col items-center  min-h-screen ">
        <div className="text-center">
          <img alt="unsplash logo" onClick={handleRedirect} src={logo} className='mx-auto cursor-pointer mt-2 mb-4 h-16'/>{" "} 
          {/*add an onclick to redirect to home page*/}
          <h1 className="text-bold text-3xl font-bold mb-4">Login</h1>
          <h3>Welcome back</h3>
        </div>
        <form className="mt-12 p-4 w-3/4 mx-auto mb-0 max-w-xl min-w-fit" onSubmit={(e)=> e.preventDefault()}>
          <div className="flex flex-col">
            <label htmlFor="email" className="block mt-4 mb-2 ">
              Email
            </label>
            <input
              type={"text"}
              name="name"
              onChange={handleChange}
              id="email"
              className="p-2 w-full border-black/50 focus:border-black border-solid border"
            />
          </div>
          <div className="flex flex-col mt-4 mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type={"text"}
              name="name"
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

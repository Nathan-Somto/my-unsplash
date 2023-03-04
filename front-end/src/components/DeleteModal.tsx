import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import deletePhotos, { IphotoDelete } from "../services/deletePhotos";
import {FaTimes} from 'react-icons/fa';
import Button from "./Button";

const DeleteModal = ({ photoId = "" }) => {
  const currentUser: any = useContext(UserContext);
  const [password, setPassword] = useState<string>("");
  async function handleSubmit() {
    const photoDelete: IphotoDelete = {
      password,
      photoId,
      username: currentUser.user,
    };

    try {
      const deletePhoto = await deletePhotos(photoDelete);
    } catch (err) {
      console.log(err);
    }
  }
  const handleChange = (e: any) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={'flex  relative flex-col items-center justify-center border border-solid h-[175px] shadow-xl rounded-md border-[rgba(25,25,25,0.5) py-[1.45rem] px-[0.25rem] min-w-[12.5rem] w-[50%] max-w-[300px] bg-white'}>
         <div className={'absolute right-[0] top-[0] p-2 '}> <FaTimes size={20} color={'black'}/></div>
          <label htmlFor="" className={'w-full flex flex-col items-center mb-0 text-left'}>
           <span>Confirm Password</span> 
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className={' w-[80%] px-2 border-solid py-2 rounded-md border-[rgba(0,0,0,0.25)] border mx-auto '}
          />
          </label>
  
        
        
        <Button styles={`w-[80%] ${password? "bg-[rgb(245,0,0)]": "bg-red-300"}`}>{"Delete Photo"}</Button>
      </form>
    </>
  );
};
export default DeleteModal;

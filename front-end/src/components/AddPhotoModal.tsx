import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../App";
import postPhotos from "../services/postPhotos";
import Button from "./Button";

type Props = {};
interface Iphoto {
  title: string;
  caption: string;
  url: string;
}

const AddPhotoModal = ({setModal}: Props) => {
  const [data, setData] = useState<Iphoto>({
    title: "",
    caption: "",
    url: "",
  });
  const currentUser: any = useContext(UserContext);
  function handlePhotoModalClose()
  {
    setModal((prevState)=>({...prevState, photoModal:false}));
  }
  async function handleSubmit() {
    if (currentUser.user) {
      try {
        postPhotos(data, currentUser.user);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="fixed h-full top-[0] w-full bg-[rgba(0,0,0,0.85)] shadow-md z-1500000000">
      <motion.form
      initial={{position:'absolute',y:'500%',x:'500%',top:'500%', left:'500%',opacity:0}}
      animate={{position:'absolute',y:'-50%',x:'-50%',top:'50%',left:'50%',opacity:1}}
      transition={{duration:0.6, delay:0.11, stiffness:200,}}
        onSubmit={handleSubmit}
        noValidate
        className={
          "flex  absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  flex-col items-center justify-center border border-solid h-[295px] shadow-xl rounded-md border-[rgba(25,25,25,0.5) py-[2rem] px-[0.25rem] min-w-[12.5rem] w-[50%] max-w-[300px] bg-white"
        }
      >
        <div className={"absolute right-[0] top-[0] p-2 "}>
          {" "}
          <FaTimes size={20} color={"black"}  className={'cursor-pointer'} onClick={handlePhotoModalClose} />
        </div>
        <div className="flex flex-col w-full mb-2">
          <label htmlFor="title" className="w-[80%] mx-auto">
            title
          </label>
          <input
            type="text"
            id="title"
            className={
              " w-[80%] px-2 border-solid py-2 rounded-md border-[rgba(0,0,0,0.25)] border mx-auto "
            }
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="caption" className="w-[80%] mx-auto">
            caption
          </label>
          <input
            type="text"
            id="caption"
            name="caption"
            className={
              " w-[80%] px-2 border-solid py-2 rounded-md border-[rgba(0,0,0,0.25)] border mx-auto "
            }
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="url" className="w-[80%] mx-auto">
            Url
          </label>
          <input
            type="text"
            id="url"
            name="url"
            className={
              " w-[80%] px-2 border-solid py-2 rounded-md border-[rgba(0,0,0,0.25)] border mx-auto "
            }
          />
        </div>
        <Button
          styles={`${!data.url? 'bg-green-300': 'bg-[rgb(0,200,0)]'} w-[80%]`}
          disabled={data.url ? false : true}
        >
          {"Submit Photo"}
        </Button>
      </motion.form>
    </div>
  );
};
export default AddPhotoModal;

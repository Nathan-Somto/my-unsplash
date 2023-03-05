import React, { useState } from "react";
import PhotoModal from "../components/AddPhotoModal";
import DeleteModal from "../components/DeleteModal";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLink,
  AiOutlineTwitter,
  AiOutlineUser,
} from "react-icons/ai";
import { MdImagesearchRoller, MdLocationOn } from "react-icons/md";
import { BiDownArrow, BiPencil } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import Empty from "../components/Empty";
type Props = {};
export interface Imodal {
  photoModal: boolean;
  deleteModal: boolean;
  linkModal: boolean;
}

export default function Profile({}: Props) {
  const [modal, setModal] = useState<Imodal>({
    photoModal: false,
    deleteModal: false,
    linkModal: false,
  });

  const Navigate = useNavigate();
  const handleAboutRedirect = () => Navigate("/About");
  return (
    <>
      {modal.photoModal && <PhotoModal setModal ={setModal}/>}
      {modal.deleteModal && <DeleteModal />}
      <Navbar openModal={setModal} />
      <header className={"flex flex-col lg:flex-row w-full lg:items-center justify-center lg:mt-[1.2rem] lg:pb-[0.6rem] lg:pt-[1.2rem] lg:h-[187px]"}>
        <div className="self-end">
          <Button
            type={"button"}
            styles={
              "bg-white border border-solid  relative  border-[rgba(100,100,100,0.5)] text-black pl-2 mr-2 pr-5 py-[0.45rem] fw-200 flex lg:hidden "
            }
            OnClick={() => handleAboutRedirect}
          >
            <span className={""}>
              <BiPencil size={20} color={"rgba(100,100,100,0.25)"} />{" "}
            </span>{" "}
            <span> Edit profile</span>
           
          </Button>
        </div>
        <div className="pl-[0.75rem]  lg:h-[187px]">
          {/* User profile image */}
          <AiOutlineUser
            size={150}
            className={
              "rounded-full text-[rgba(100,100,100,0.5)] border border-solid border-black/50"
            }
          />
        </div>

        <div className="flex flex-col justify-center pl-[2rem] mt-2 lg:h-[187px]  lg:justify-start lg:ml-[1.5rem]">
         <div className="flex items-center">
          <h2 className="text-bold text-[2rem] mr-5">{"User Name"}</h2>
          <Button
            type={"button"}
            styles={
              "hide  bg-white border border-solid  relative border-[rgba(100,100,100,0.5)] text-black px-5 py-[0.45rem] fw-200  hover:border-[rgb(0,0,0)]  "
            }
            OnClick={() => handleAboutRedirect}
          >
            <span className={"absolute left-[0] pr-2"}>
              <BiPencil size={20} color={"rgba(100,100,100,0.5)"} />{" "}
            </span>{" "}
            Edit profile
          </Button>
          </div>
          <p className="ml-2 mb-2 fw-400 text-[1.2rem] ">{"user's bio"}</p>

          <div className="flex text-[rgb(110,110,110,0.5)] mb-2">
            <span className="mr-2">
              <MdLocationOn size={25} color={"rgba(110,110,110,0.5)"} />
            </span>
            <p>{"user location"}</p>
          </div>
          <div   onClick={ (e) => {
              console.log(e.target)
              setModal((prevState) => ({ ...prevState, linkModal: true }));
            } }className={`flex ease-in mb-2 cursor-pointer ${modal.linkModal?'text-black':'text-[rgb(110,110,110,0.5)]'}`}>
            <span className="mr-2">
              {" "}
              <AiOutlineLink size={20} color={`${modal.linkModal?'black':'rgb(110,110,110,0.5)'}`} />
            </span>
            <p className="mr-2"> {"Connect with User name"}</p>
            <span>
              <BiDownArrow size={17} color={`${modal.linkModal?'black':'rgb(110,110,110,0.5)'}`} />
            </span>
          </div>
          {/* user link modal goes here */}
          <div
           
            className={`${
              modal.linkModal ? "d-block" : "hidden"
            } mt-2 flex z-50 top-[0]  relative flex-col  border border-solid h-[135px] shadow-xl rounded-md border-[rgba(25,25,25,0.5) py-[0.55rem] px-[0.55rem] w-[135px]  bg-white`}
          >
            <div className="flex text-[rgb(110,110,110,0.5)] mb-2">
            <div className={"absolute right-[0] top-[0] p-2 mb-2"}  onClick={ (e) => {
              console.log(e.target)
              setModal((prevState) => ({ ...prevState, linkModal: false }));
            } }>
          {" "}
          <FaTimes size={20} color={"rgba(0,0,0,0.75)"} />
        </div>
              <span className="mr-2">
                <AiOutlineTwitter size={25} color={"rgba(110,110,110,0.5)"} />
              </span>
              <a href="#">{"Twitter"}</a>
            </div>
            <div className="flex text-[rgb(110,110,110,0.5)] mb-2">
              <span className="mr-2">
                <AiOutlineInstagram size={25} color={"rgba(110,110,110,0.5)"} />
              </span>
              <a href="#">{"Instagram"}</a>
            </div>
            <div className="flex text-[rgb(110,110,110,0.5)] mb-2">
              <span className="mr-2">
                <AiOutlineFacebook size={25} color={"rgba(110,110,110,0.5)"} />
              </span>
              <a href="#">{"Facebook"}</a>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section>
          <h3> <span><MdImagesearchRoller size={20} color={'black'}/></span> Photos</h3>
          <hr className="text-[rgba(110,110,110,0.5)]"/>
          <Empty location={'/profile/:username'}/>
        </section>
      </main>
    </>
  );
}

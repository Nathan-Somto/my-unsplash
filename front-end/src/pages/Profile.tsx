import React, { useState } from "react";
import PhotoModal from "../components/AddPhotoModal";
import DeleteModal from "../components/DeleteModal";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

type Props = {};
export interface Imodal {
  photoModal: boolean;
  deleteModal: boolean;
}

export default function Profile({}: Props) {
  const [modal, setModal] = useState<Imodal>({
    photoModal: false,
    deleteModal: false,
  });
  const Navigate = useNavigate();
  const handleAboutRedirect = () => Navigate("/About");
  return (
    <>
      {modal.photoModal && <PhotoModal />}
      {modal.deleteModal && <DeleteModal />}
      <Navbar openModal={setModal} />
      <header>
        <div>{/* User profile image */}</div>
        <div>
          <h1>{/* User name */}</h1>
          <Button type={"button"} OnClick={() => handleAboutRedirect}>
            Edit profile
          </Button>
        </div>
        <div>
          <p>{"user's bio"}</p>
        </div>
      </header>
      <main></main>
    </>
  );
}

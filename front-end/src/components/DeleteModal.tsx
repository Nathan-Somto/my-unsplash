import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import deletePhotos, { IphotoDelete } from "../services/deletePhotos";

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <Button>{"Delete Photo"}</Button>
      </form>
    </>
  );
};
export default DeleteModal;

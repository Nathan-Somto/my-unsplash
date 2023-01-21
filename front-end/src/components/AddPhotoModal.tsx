import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import postPhotos from "../services/postPhotos";
import Button from "./Button";

type Props = {};
interface Iphoto {
  title: string;
  caption: string;
  url: string;
}

const AddPhotoModal = (props: Props) => {
  const [data, setData] = useState<Iphoto>({
    title: "",
    caption: "",
    url: "",
  });
  const currentUser: any = useContext(UserContext);
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
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title">title</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="caption">caption</label>
          <input type="text" id="caption" name="caption" />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input type="text" id="url" name="url" />
        </div>
        <Button>{"Submit Photo"}</Button>
      </form>
    </>
  );
};
export default AddPhotoModal;

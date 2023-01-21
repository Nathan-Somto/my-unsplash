import axios, { AxiosResponse } from "axios";

export interface IphotoDelete {
  password: string;
  username: string;
  photoId: string;
}

async function deletePhotos({ password, username, photoId }: IphotoDelete) {
  const userPhoto: AxiosResponse<unknown> = await axios.delete(
    `http://localhost:8000/api/user/photo/${username}/${photoId}`,
    { data: password }
  );
}

export default deletePhotos;

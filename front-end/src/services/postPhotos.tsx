import axios, { AxiosResponse } from 'axios';

/*type Props = {
    data:
}*/

export default async  function postPhotos( data: any, username :string) : Promise<void>
{
    
        const userPhoto: AxiosResponse<unknown> = await axios.post(`http://localhost:8000/api/user/photo/${username}`, data);
     
  
}
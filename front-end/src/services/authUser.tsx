import axios, { AxiosResponse } from 'axios';

/*type Props = {
    data:
}*/

export default async  function authUser( data: any, url :string) : Promise<boolean>
{
    try{
        const userToken: AxiosResponse<unknown> = await axios.post(`http://localhost:8000/api/${url}`, data);
        console.log(userToken);
        //localStorage.setItem('token', userToken as unknown as string);
        return true;
    }
    catch(err){
    return false
    }
  
}
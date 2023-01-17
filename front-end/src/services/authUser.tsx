import axios, { AxiosResponse } from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

/*type Props = {
    data:
}*/

export default async  function authUser( data: any, url :string) : Promise<void>
{
    
        const userToken: AxiosResponse<unknown> = await axios.post(`http://localhost:8000/api/${url}`, data);
        const user:any = jwt_decode((userToken.data as unknown as any).token as string);
        if(user){
        localStorage.setItem('token',(userToken.data as unknown as any).token as string );
        }
        
        // decode the user 
        // return the user
        // then the login/register sets the user state
        // which allows the protected route to be free
        // when then redirect the user to the profile page
        // make a request for the user info and fill the  profile pag
  
}
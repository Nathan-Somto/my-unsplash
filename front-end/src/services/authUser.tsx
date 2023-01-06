import axios, { AxiosResponse } from 'axios';

/*type Props = {
    data:
}*/

export default async  function authUser( data: any, url :string) : Promise<string>
{
    try{
        const userToken: AxiosResponse<unknown> = await axios.post(`http://localhost:8000/api/${url}`, data);
        
        localStorage.setItem('token', userToken as unknown as string);
        // decode the user 
        // return the user
        // then the login/register sets the user state
        // which allows the protected route to be free
        // when then redirect the user to the profile page
        // make a request for the user info and fill the  profile page
        return '';
    }
    catch(err){
    return '';
    }
  
}
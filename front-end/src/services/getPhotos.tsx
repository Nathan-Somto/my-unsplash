import axios from "axios";
/**
 * 
 * @param url the url for fetching all photos
 * @route public
 */
export default async function getPhotos(): Promise<any>
{
    try{
        const  response = await axios.get('http://localhost:8000/api/photos');
return  response.data;

    }
    catch(err){
        console.log(err);
    }
}
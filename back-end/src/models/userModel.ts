import {Schema, model, Types, SchemaType} from 'mongoose'; 
import {IAbout , aboutSchema} from "./aboutModel";
import jwt from "jsonwebtoken";
interface IUser{
    first_name:string;
    last_name:string;
    username:string;
    email:string;
    password:string;
    joined: Date;
    photos: Types.ObjectId;
    about:IAbout;
}
interface Itoken{
    id:Schema.Types.ObjectId,
    username: string,
    email: string
}
let userSchema  =  new Schema<IUser>({
    first_name : String,
    last_name: String,
    username:{type: String, required: true, unique:true, minLength:6},
    email:
     {  type: String,
        required: true,
          maxLength:100,
           minLength:11,
            unique: true
        },
        password:{type: String, required: true, minLength:8},
        joined: {type:Date, default: Date.now()},
        photos:
        [{
            type:Schema.Types.ObjectId,
            ref:'Photos'
        }],
        about:aboutSchema
});
export function generateAuthToken (user:Itoken):string{
    return jwt.sign(
        {
            _id: user.id,
            username:user.username,
            email:user.email
        },
        'mySecretKey',{
            expiresIn: '1d'}
    )
}
export let userModel = model("User", userSchema);

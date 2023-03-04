import {Schema , model } from 'mongoose';
   interface IAbout{
    avatar?:number;
    location?:string;
    bio?:string;
    IgUsername?:string;
    linkedinUsername?:string;
    twitterUsername?:string;
}
 const aboutSchema = new Schema<IAbout>({
        avatar:{
            data:Buffer,
            contentType:String,
        }, 
        location:String,
        bio:{type:String, maxLength:250, },
        IgUsername:String,
        linkedinUsername:String,
        twitterUsername:String,
})
 const About = model("About",  aboutSchema);
 export {IAbout, aboutSchema, About};
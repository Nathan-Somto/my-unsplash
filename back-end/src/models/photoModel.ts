import {Schema, model, Types} from 'mongoose';
interface IPhoto {
    title:string;
    caption : string;
    url: string;
    user: Types.ObjectId;
}
let photoSchema = new Schema<IPhoto>({
    title:{type:String, required:true},
    caption: {type:String , required: true},
    url:{type:String, required: true},
    user:{type:Schema.Types.ObjectId, ref:"User"}
})
export let photoModel = model("Photos",photoSchema);


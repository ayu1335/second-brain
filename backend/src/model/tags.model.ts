import {model,Schema} from "mongoose";
import { required } from "zod/mini";

const TagSchema=new Schema({
    title:{type:String,required:true}
})

export default model("tag",TagSchema);
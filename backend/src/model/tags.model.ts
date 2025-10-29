import {model,Schema} from "mongoose";

const TagSchema=new Schema({
    title:{type:String,required:true}
})

export default model("tag",TagSchema);
import { Schema, model } from "mongoose";

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  imageUrl:{type:String, required:false},
  mobile: { type: Number, required: true },
  followedShops:{
    type:[Schema.Types.ObjectId], required:false 
  },
  likedProducts:{
    type:[Schema.Types.ObjectId], required:false 
  },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
});

export default model("user", schema);

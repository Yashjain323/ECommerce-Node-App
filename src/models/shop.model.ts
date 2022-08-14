import { Schema, model } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  shopImg: { type: String, required: true },
  kartaName: { type: String, required: true },
  aadharNo: { type: Number, required: true },
  panNo: { type: String, required: false },
  gstNo: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
  ratings: { type: Number, required: false },
  address: { type: String, required: true },
  state: { type: String, required: true },
  usersFollowing:{
    type:[Schema.Types.ObjectId], required:false 
  },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  location: {
    type: {type :String, required: true, default:"Point"},
    coordinates: [Number]
  },
  isVerified: { type: Boolean, required: true, default: false },
  isBlocked: { type: Boolean, required: true, default: false },
  createdOn: { type: Number, required: true, default: Date.now },
  isDeleted: { type: Boolean, required: true, default: false },
});

// 3. Create a Model.
export default model("shop", schema);

import { Schema, model } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const schema = new Schema({
  name: { type: String, required: true },
  createdOn: { type: Number, required: true, default: Date.now },
  isStatus :{type:Boolean, required:true, default:false},
  isDeleted: { type: Boolean, required: true, default: false },
});

// 3. Create a Model.
export default model("productCategory", schema);

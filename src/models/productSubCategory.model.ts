import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  categoryId:{type: Schema.Types.ObjectId, required: true, ref: "productCategory"},
  createdOn: { type: Number, required: true, default: Date.now },
  isStatus :{type:Boolean, required:true, default:false},
  isDeleted: { type: Boolean, required: true, default: false },
});

// 3. Create a Model.
export default model("productSubCategory", schema);
import { Schema, model } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const schema = new Schema({
  name: { type: String, required: true },
  shopId: { type: Schema.Types.ObjectId, required: true, ref: "shop" },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: false },
  imageURLs: { type: [String], required: true },
  videoUrl: { type: [String], required: false },
  usersLiking:{
    type:[Schema.Types.ObjectId], required:false 
  },
  categoryId: { type: Schema.Types.ObjectId, required: false, ref: "productCategory" },
  subCategoryId: { type: Schema.Types.ObjectId, required: false, ref: "productSubCategory" },
  childCategoryId: { type: Schema.Types.ObjectId, required: true, ref: "productChildCategory" },
  createdOn: { type: Number, required: true, default: Date.now },
  isDeleted: { type: Boolean, required: true, default: false },
});

// 3. Create a Model.
export default model("products", schema);

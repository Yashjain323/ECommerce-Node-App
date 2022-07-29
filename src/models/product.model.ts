import { Schema, model } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const schema = new Schema({
  name: { type: String, required: true },
  shopId: { type: Schema.Types.ObjectId, required: true, ref: "shop" },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: false },
  discount: { type: Number, required: false },
  imageURLs: { type: [String], required: true },
  videoUrl: { type: String, required: true },
  createdOn: { type: Number, required: true, default: Date.now },
  isDeleted: { type: Boolean, required: true, default: false },
});

// 3. Create a Model.
export default model("products", schema);

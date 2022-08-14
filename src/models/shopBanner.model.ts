import { Schema, model } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const schema = new Schema({
  shopId: { type: Schema.Types.ObjectId, required: true },
  shopBanner: { type: String, required: true }
});

// 3. Create a Model.
export default model("shopBanner", schema);

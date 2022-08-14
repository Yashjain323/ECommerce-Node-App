import { Schema, model } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const schema = new Schema({
  title: String, 
  shopId: { type: Schema.Types.ObjectId, required: true, ref: "shop" },
  desc: { type: String, required: false },
  products:{type:[{  
    proId: { type: Schema.Types.ObjectId, required: true },
    discount: { type: Number, required: false },
}]},
  shopBanner: { type: String, required: false },
  createdOn: { type: Number, required: true, default: Date.now },
  isDeleted: { type: Boolean, required: true, default: false },
});

// 3. Create a Model.
export default model("proOffer", schema);

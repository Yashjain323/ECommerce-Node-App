import { Schema, model } from "mongoose";

// 1. Create a Schema corresponding to the document interface.
const schema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    medium: { type: String, required: true },
});

// 3. Create a Model.
export default model("enquiry", schema);

import { Schema, model} from 'mongoose';

const schema = new Schema({
    userId:{ type:Schema.Types.ObjectId, required: true },
    productId:{ type:Schema.Types.ObjectId, required: true },
    message:{ type: String, required: true},
});

export default model("report", schema);
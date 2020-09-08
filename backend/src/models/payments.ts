import { model, Model, Schema, Document } from "mongoose";
import { generateHash } from "../utils/bcrypt";

export interface IPayment extends Document {
    name: String
    category: String
    date: Date
    price: number
    committed: boolean
}

const PaymentSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    commited: { type: Boolean}
})

export const Payment: Model<IPayment> = model('Payment', PaymentSchema);

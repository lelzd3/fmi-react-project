import { model, Model, Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: String
    userId: String
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true }
})

export const Category: Model<ICategory> = model('Category', CategorySchema);

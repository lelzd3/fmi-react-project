import { model, Model, Schema, Document } from "mongoose";
import { generateHash } from "../utils/bcrypt";

export interface IUser extends Document {
    name: String
    email: String
    password: String
}

const UserSchema: Schema = new Schema({
	name: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

UserSchema.pre('save', function(this: IUser, next: any) {
	if(this.isModified('password')) {
		this.password = generateHash(this.password)
	}
	next()
})

export const User: Model<IUser> = model('User', UserSchema);

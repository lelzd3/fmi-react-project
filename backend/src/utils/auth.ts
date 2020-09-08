import { sign, verify } from "jsonwebtoken";
import { User, IUser } from "../models/users";

const JWT_SECRET = process.env.JWT_SECRET || "bonobo";

export function signToken(user: IUser) {
	const userData = user.toObject();
	delete userData.password;
	return sign(userData, JWT_SECRET);
}

export function verifyToken(req, res, next) {
	const token = req.get('token') || req.body.token || req.query.token;
	if(!token) {
		return res.status(401).json({success: false, message: "No token provided"});
	}

	verify(token, JWT_SECRET, (err, decodedData) => {
		if(err) {
			return res.status(400).json({success: false, message: "Invalid token."});
		}
		User.findById(decodedData._id, (err, user) => {
			if(err) {
				return res.status(400).json({success: false, message: "Invalid token."})
			}
			req.user = user;
			next();
		})
	})
}
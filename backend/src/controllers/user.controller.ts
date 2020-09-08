  
import { Request, Response } from "express";
import { injectable } from "inversify";
import { User, IUser } from "../models/users";
import { signToken } from "../utils/auth";
import { validPassword } from "../utils/bcrypt";

@injectable()
export class UserController {

	createUser = async (req: Request, res: Response) => {
		const userPayload: IUser = req.body;
		try {
			const checkExistence = User.findOne({email: userPayload.email});
			if (checkExistence) {
				return res.status(400).json({success: false, message: "User with that email already exists."});
			}
			const savedUser = await User.create(userPayload);
			const token = signToken(savedUser);
			return res.status(201).json({success: true, message: `User created - ${JSON.stringify(savedUser)}. Token attached.`, token})
		} catch (err) {
			console.log(err)
			return res.status(500).json({success: false, err: "Unexpected error occured."})       
		}
	}

    authenticate = async (req: Request, res: Response) => {
		const userPayload: IUser = req.body;
		if (!userPayload) {
			return res.status(400).json({success: false, message: "No user body passed."})
		}

        try {
            const user = await User.findOne({email: userPayload.email});
            if (!user || !validPassword(userPayload.password, user.password as string)) {
                return res.status(400).json({success: false, message: "Invalid credentials."})
            }
            const token = signToken(user)
            return res.status(200).json({success: true, message: "Token attached.", token})
        } catch (err) {
			console.log(err);
            return res.status(500).json({success: false, err: "Unexpected error occured."})
        }
    }

    updateUser = async (req: Request, res: Response) => {
        const userId = req.params.id;
        const userUpdate = req.body;
        if (!userId) {
            return res.status(400).json({success: false, message: "No user id passed."})
        }
        if (!userUpdate) {
          	return res.status(400).json({success: false, message: "No user body passed."})
        }

        try {
			const currentUser = await User.findById(userId);
			if (!currentUser) {
				return res.status(400).json({success: false, message: "User does not exist."});
			}
            const savedUser = currentUser.save(userUpdate)
            return res.status(200).json({success: true, message: "User updated.", savedUser})
        } catch (err) {
            console.log(err)
            return res.status(500).json({success: false, err: "Unexpected error occured."})       
        }
    }

    deleteUser = async (req: Request, res: Response) => {
		const userId = req.params.id;
		if (!userId) {
            return res.status(400).json({success: false, message: "No user id passed."})
        }
        try {
            await User.findByIdAndRemove(userId);
            res.status(200).json({success: true, message: "User deleted."})
        } catch(err) {
            console.log(err)
            return res.status(500).json({success: false, err: "Unexpected error occured."})  
        }
    }
}
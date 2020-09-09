  
import { Request, Response } from "express";
import { injectable } from "inversify";
import { ICategory, Category } from "../models/category";

@injectable()
export class CategoriesController {

	createCategory = async (req: Request, res: Response) => {
		const categoryPayload: ICategory = req.body;
		if (!categoryPayload) {
			return res.status(400).json({success: false, message: "No category body passed."})
		}
		categoryPayload.userId = req["user"]._id;
		try {
			const savedCategory = await Category.create(categoryPayload);
			return res.status(201).json({success: true, message: `Category created - ${JSON.stringify(savedCategory)}.`, data: savedCategory})
		} catch (err) {
			console.log(err)
			return res.status(500).json({success: false, err: "Unexpected error occured."})       
		}
	}

	getAllCategoriesForAUser = async (req: Request, res: Response) => {
        try {
			const allCategoriesForAUser = await Category.find({userId: req["user"]._id});
            res.status(200).json({success: true, message: "All categories for user retrieved.", data: allCategoriesForAUser})
        } catch(err) {
            console.log(err)
            return res.status(500).json({success: false, err: "Unexpected error occured."})  
        }
	}
}
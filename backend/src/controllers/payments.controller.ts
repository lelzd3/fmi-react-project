  
import { Request, Response } from "express";
import { injectable } from "inversify";
import { IPayment, Payment } from "../models/payments";

@injectable()
export class PaymentsController {

	createPayment = async (req: Request, res: Response) => {
		const paymentPayload: IPayment = req.body;
		try {
			const savedPayment = await Payment.create(paymentPayload);
			return res.status(201).json({success: true, message: `Payment created - ${JSON.stringify(savedPayment)}.`})
		} catch (err) {
			console.log(err)
			return res.status(500).json({success: false, err: "Unexpected error occured."})       
		}
	}

    deletePayment = async (req: Request, res: Response) => {
		const paymentId = req.params.id;
		if (!paymentId) {
            return res.status(400).json({success: false, message: "No payment id passed."})
        }
        try {
            await Payment.findByIdAndRemove(paymentId);
            res.status(200).json({success: true, message: "Payment deleted."})
        } catch(err) {
            console.log(err)
            return res.status(500).json({success: false, err: "Unexpected error occured."})  
        }
    }
}
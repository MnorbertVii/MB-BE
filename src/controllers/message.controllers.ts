import { Request, Response } from "express";
import Message from "../models/message.model";
import { messageServices } from "../services/message.services";

export class MessageControllers {
    static async postMessage(req: Request, res: Response) {
        try {
            const { name, email, message } = req.body;

            const response = await messageServices.sendMessage({ name, email, message });
            if (response !== true) {
                return res.status(400).json({ response });
            } else {
                const data = new Message({
                    name: name,
                    email: email,
                    message: message,
                });
                return res.status(200).json({ 
					message: "Message sent successfully",
					data : data
				});
            }
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

	static async displayMessages(req: Request, res: Response) {
		try {
			const messages = await messageServices.viewMessages();
			res.status(200).json({ messages });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error });
		}
	}

	static async removeMessage(req: Request, res: Response) {
		try {
			await messageServices.deleteMessage(req.params.id);
			res.status(200).json({ message: "Message removed successfully" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error });
		}
	}
}
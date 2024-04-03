import Message, { IMsg } from "../models/message.model";
import validateMsg from "../validations/message.validation";

export class messageServices {
	static async sendMessage(data: any): Promise<boolean | string[]> {
		const { error, value } = validateMsg(data);

		if (error) {
			return error.details.map((err) => err.message);
		} else {
			const message = new Message(value);
			await message.save();
			return true;
		}
	}

	static async viewMessages(): Promise<IMsg[]> {
		const messages = await Message.find();
		return messages;
	}

	static async deleteMessage(id: string): Promise<any> {
		return await Message.deleteOne({ _id: id });
	}
}

import Message, { IMsg } from "../models/message.model";
import validateMsg from "../validations/message.validation";
import nodemailer from "nodemailer";

export class messageServices {
  static async sendMessage(data: any): Promise<boolean | string[]> {
    const { error, value } = validateMsg(data);

    if (error) {
      return error.details.map((err) => err.message);
    } else {
      const { name, email, message } = value;

      let transporter = nodemailer.createTransport({
		service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APP_PASSWORD,
        },
		tls: {
			rejectUnauthorized: false
		  }
      });
      let mailOptions = {
        to: "nimuhnorbert@gmail.com",
        subject: `New Message from Portfolio Website by user ${name} with email ${email}`,
        text: message,
		replyTo: email
      };
      try {
        await transporter.sendMail(mailOptions);

        const saveMessage = new Message(value);
        await saveMessage.save();
        return true;
      } catch (error: any) {
        console.error(error);
        return ["message sending failed"];
      }
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

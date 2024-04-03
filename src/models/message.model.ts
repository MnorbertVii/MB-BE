import mongoose, { Schema, Document } from "mongoose";

export interface IMsg extends Document {
	name: string;
	email: string;
	message: string;
	sentAt?: Date;
}

const messageSchema: Schema = new Schema({
	name: String,
	email: String,
	message: String,
	sentAt: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMsg>("Message", messageSchema);
export default Message;

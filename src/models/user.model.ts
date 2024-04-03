import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt?: Date; 
  updatedAt?: Date;
  isAdmin: Boolean;
}

const userSchema = new Schema<IUser>({
  fullName: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {timestamps: true});

const User = mongoose.model<IUser>("User", userSchema);

export { User };
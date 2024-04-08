import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateUser from "../validations/user.validation";

const SECRET_KEY = process.env.SECRET_KEY!;

export default class UserServices {
  static async signUp(data: any) {
    const { error, value } = validateUser(data);
    if (error) {
        return { error: error.details.map((detail: any) => detail.message) };
    } else {
      const existingEmail = await User.findOne({ email: data.email });
      if (existingEmail) {
        return "Oops, Email already exists";
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({
          fullName: data.fullName,
          email: data.email,
          password: hashedPassword,
          isAdmin: data.isAdmin,
        });
        await newUser.save();
        
        let token = jwt.sign(
          {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        return {
          message: "User created successfully",
          // token: token,
          user: {
            id: newUser._id,
            email: newUser.email,
            userName: newUser.fullName,
            createdAt: newUser.createdAt,
          },
        };
      }
    }
  }

  static async login(data: any) {
    const { error, value } = validateUser(data);
    if (error) {
      return { error: error.details.map((err: any) => err.message) };
    } else {
      const existingUser = await User.findOne({ email: data.email });
      if (!existingUser) {
        return "Email does not exist";
      } else {
        let token = jwt.sign(
          {
            id: existingUser._id,
            email: existingUser.email,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        const validPassword = await bcrypt.compare(
          data.password,
          existingUser.password
        );
        if (!validPassword) {
          return "Password Incorrect";
        } else {
          return token
        }
      }
    }
  }

  static async getUser(data: any) {
    console.log(data);
  }

  static async getUsers() {
    let AllUsers = await User.find({});
    return AllUsers.map((user) => {
      return { fullName: user.fullName, email: user.email };
    });
  }
}
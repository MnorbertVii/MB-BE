import UserServices from "../services/user.services";

export default class UserControllers {
    static async register(req: any, res: any) {
        try {
            const { fullName, email, password, isAdmin } = req.body;
            const data = {
                fullName: fullName,
                email: email,
                password: password,
                isAdmin: isAdmin
            };

            const response: any = await UserServices.signUp(data);
            if(response){
                if (response.error) {
                    return res.status(400).json({ errors: response.error });
                } else if (response === "Oops, Email already exists") {
                    return res.status(500).json({
                        message: response
                    });
                } else {
                    return res.status(200).json(response);
                }
            }
        } catch (error: any) {
            console.log(error);
            res.status(500);
            return res.json({
                error: "Internal Server Error",
                message: error.message
            });
        }
    }

    static async loginUser(req: any, res: any) {
        try {
            const { email, password } = req.body;
            const data = {
                email: email,
                password: password
            };
            const response: any = await UserServices.login(data);
            if (response.error) {
                return res.status(400).json({ errors: response.error });
            } else if (response === "Email does not exist" || response === "Password Incorrect") {
                return res.status(400).json({ message: response });
            } else {
                return res.status(200).json({
                    message: "Login successful, here's the token",
                    Token: response
                });
            }
        } catch (error: any) {
            console.log(error);
            res.status(500);
            return res.json({
                error: "Internal Server Error",
                message: error.message
            });
        }
    }

    static async getAllUsers(req: any, res: any) {
        try {
            if (res.locals.email) {
                let response: any = await UserServices.getUsers();
                return res.status(200).json({
                    message: "All users",
                    data: response
                });
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        } catch (error: any) {
            console.log(error);
            res.status(500);
            return res.json({
                error: "Internal Server Error",
                message: error.message
            });
        }
    }
}
import { NextFunction } from "express";
import { UserInterface } from "../../interfaces/user.interface";
import UserModel from "../../models/user.model";


class AuthService {
    async SignUp(
        name: string,
        phoneNumber: number,
       next:NextFunction
    ): Promise<{ user: UserInterface } | void> {
        try {
          
            const user = await UserModel.create({
                name,
                phoneNumber
            });
            return  {user} ;
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthService();
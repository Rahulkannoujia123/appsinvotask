
import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ResInterface } from "../../interfaces/req.interface";
import { UserInterface } from "../../interfaces/user.interface";
import UserModel from "../../models/user.model";
import { Auth } from "../../utils/auth";



class UserService{
    async createUser(
        name:string,
        email: string,
        password: string,
        address:string,
        lat:string,
        long:string,
        res: ResInterface,
        next: NextFunction
    ): Promise<{ user: UserInterface, token: string } | void> {
        try {
            const user = await UserModel.create({ name,email,password,address,lat,long,res,next });

            const payload = {
                id: user._id,
                email: user.email,
            }

            const token = await new Auth().getToken(
                payload,
                '1d',
                next
            );

            

            return {
                user,
                token
            }

        } catch (error) {
            next(error);
        }
    }

}
export default new UserService();
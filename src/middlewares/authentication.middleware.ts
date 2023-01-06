import { NextFunction } from "express";
import ResponseHelper from "../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../interfaces/req.interface";
import { UserInterface } from "../interfaces/user.interface";
import SessionModel from "../models/session.model";
import { Auth } from "../utils/auth";


class Authentication {
    

    async user(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {

            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }

            if (!token) {
                return ResponseHelper.unAuthenticated(res, ('authentication_required'), {}, 'TOKEN_REQUIRED')
            }

            const decoded = await new Auth().decodeJwt(token);
            const session: any = await SessionModel.findById(decoded.id).populate('user');

            if (!session) {
                return ResponseHelper.unAuthenticated(res, ('jwt_invalid_token'));
            }

            if (!session.isActive) {
                return ResponseHelper.expired(res, ('session_expired'));
            }
            const user = session.user as UserInterface;
            req.user = user;
            next();

        } catch (err) {
            return next(err);
        }
    }
}

export default new Authentication();
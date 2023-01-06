import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import AuthService from "../../services/app/auth.service";
import { Auth } from "../../utils/auth";
class AuthController{
    async SignUp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
          const name = req.body.name;
          const phoneNumber = req.body.phoneNumber;
         // const logger = res.logger;
    
         // logger.error('this is error')
          const data = await AuthService.SignUp(
            name,
            phoneNumber,
           next
          ); 
         await new Auth().generateVerificationCode();
          if (data) 
            return ResponseHelper.ok(res, res.__('user_signup'), data);
            
        } catch (error) {
          next(error);
        }
      }
}
export default new AuthController();
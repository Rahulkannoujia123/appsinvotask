
import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import { Auth } from "../../utils/auth";
import UserService from "../../services/app/user.service";
import UserModel from "../../models/user.model";





class UserController{
    async add(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const { name,email,password,address,lat,long } = req.body;
            const user = await UserService.createUser(name,email,password,address,lat,long,res,next);
           
            if (user) {
               
                
                res.logMsg = `User created successfully `;
                
               
                return ResponseHelper.created(res,('User created successfully'), { user });
            }
            else{
                return ResponseHelper.badRequest(res, ('user not created'), {  });
            }

      
        } catch (error) {
            console.log(error)
           next(error);
        //    return ResponseHelper.badRequest("Somthing went wrong");

        }
    }
   
    async activeupdateStatus(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            let userId = req.params.id;
            let user:any = await UserModel.findOne({
                "_id": userId
            });
            user.isActive = !user.isActive;
            user.save();

           
            res.logMsg = 'User update status  successfully';
            return ResponseHelper.ok(res, ('User update status  successfully'), {user});
        } catch (error) {
            next(error)
        }
    };
    async getDistance(req:ReqInterface,res:ResInterface,next:NextFunction){
        try{
             const user=await UserModel.find();
             return ResponseHelper.ok(res, ('User update status  successfully'), {user});

        }catch (error) {
            next(error)
        }
    }
    
}
export default new UserController();
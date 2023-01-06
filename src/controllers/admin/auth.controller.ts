import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import AdminModel from "../../models/admin.model";
import AuthService from "../../services/admin/auth.service";
import { Auth } from "../../utils/auth";

class AuthController {
  /**
    * @api {post} /api/v1/admin/auth/login Log In
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiVersion 1.0.0
    * @apiName login
    * @apiGroup Admin-Auth
    * @apiBody {String} email Email Id.
    * @apiBody {String} password 
    * @apiSuccessExample {json} Success-Response:
    *    {
    * "status": 200,
    * "statusText": "SUCCESS",
    * "message": "Admin login successfully",
    * "data": {
    *    "admin": {
    *        "_id": "637217547d1d0775c4bf084f",
    *        "email": "admin@traytracker.com",
    *        "name": "Tray&Tracker",
    *        "createdAt": "2022-11-14T10:24:20.711Z",
    *        "updatedAt": "2022-11-15T11:40:01.872Z",
    *        "__v": 0
    *    },
    *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIxNzU0N2QxZDA3NzVjNGJmMDg0ZiIsImVtYWlsIjoiYWRtaW5AdHJheXRyYWNrZXIuY29tIiwiaWF0IjoxNjY4NTc0NDI3LCJleHAiOjE2Njg2NjA4Mjd9.q8Re91EXeguty6YgsMkDedk-SrOeTLQfPelTo2G7yiM",
    *    "execTime": 111
    *   }
    *  }
    *
    * @apiErrorExample {json} Error-Response:
    * HTTP/1.1 400 Bad Request
    *  {
    *        "status": 400,
    *        "message": "Incorrect email or password"
    *  }
    *
    *
    */
  async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const logger = res.logger;

      logger.info('this is error', {email, password})
      const data = await AuthService.login(
        email,
        password,
        res,
        next
      ); 
      if (data) 
        return ResponseHelper.ok(res, res.__('admin_login'), data);
        
    } catch (error) {
      next(error);
    }
  }
/**
      * @api {post} /api/app/admin/change-password Change Password
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiVersion 1.0.0
      * @apiName change-password
      * @apiGroup Admin-Auth
      * @apiBody {String} passwordCurrent
      * @apiBody {String} password  
      * @apiSuccessExample {json} Success-Response:
      *     HTTP/1.1 200 OK
      *     {
      *        "status": 200,
      *        "message": "password changed successfully"
      *     }
      *
      * @apiErrorExample {json} Error-Response:
      * HTTP/1.1 400 Bad Request
      *  {
      *        "status": 400,
      *        "message": "Invalid password"
      *  }
      *
      *
      **/
  async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const passwordCurrent = req.body.passwordCurrent;
      const password = req.body.password;

      const admin: any = await AdminModel.findById(req.admin._id);

      const isPasswordCurrentCorrect = await new Auth().comparePassword(passwordCurrent, admin.password);

      if (!isPasswordCurrentCorrect) {
        return ResponseHelper.badRequest(res, res.__('incorrect_password'));
      }

      const encryptedPassword = await new Auth().encryptPassword(password);

      admin.password = encryptedPassword;
      await admin.save();

      res.logMsg = `Admin password changed successfully`

      return ResponseHelper.ok(res, res.__('admin_password_changed'), {});
    } catch (err) {
      next(err);
    }
  }

}

export default new AuthController();
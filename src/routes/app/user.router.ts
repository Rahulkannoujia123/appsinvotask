import { Router } from "express";
import CustomerController from "../../controllers/app/customer.controller";
import UserController from "../../controllers/app/user.controller";
import Authentication from "../../middlewares/authentication.middleware"




class UserRouter {
    public router:any;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
    }

    postRoutes() {
        this.router.post(
            '/create-user',
            UserController.add
           
        );

       
    }

    patchRoutes() {
        this.router.patch(
            '/update-status',
            UserController.activeupdateStatus
            
        );
    }
    getRoutes(){
        this.router.get(
           '/distance',
           Authentication.user,
           UserController.getDistance 
        )
        this.router.get(
            '/get-customer',
            CustomerController.customer
        )
        this.router.get(
            '/get-transaction',
            CustomerController.transaction
        )
    }
}

export default new UserRouter().router;
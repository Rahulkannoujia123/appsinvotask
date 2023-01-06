import { Router } from "express";
import AuthController from "../../controllers/app/auth.controller";


class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.patchRoutes();
    }

    postRoutes() {
        this.router.post(
            '/register',
     
            
            

        );
        this.router.post(
            '/verify-otp',
            
        

        );
        this.router.post(
            '/login',
            
        

        );

     
    }

    patchRoutes() {

    }
}

export default new AuthRoutes().router;
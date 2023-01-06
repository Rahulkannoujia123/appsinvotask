import { Router } from "express";


import UserRouter from "./app/user.router";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
  
  }

  app() {
    this.router.use('/app/user',UserRouter)
  }


   
    
  }


export default new Routes().router;
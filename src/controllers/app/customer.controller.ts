import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/req.interface";
import CustomerModel from "../../models/customer.model";
import TransactionModel from "../../models/transaction.model";

class Customer{

async customer(req:ReqInterface,res:ResInterface,next:NextFunction){
    try{
         const customer=await CustomerModel.find();
         return ResponseHelper.ok(res, ('Customer fetch  successfully'), {customer});

    }catch (error) {
        next(error)
    }
}
async transaction(req:ReqInterface,res:ResInterface,next:NextFunction){
    try{
        const accountId=req.params.account_id;
         const transaction=await TransactionModel.find( {accountId});
         return ResponseHelper.ok(res, ('Transaction fetch  successfully'), {transaction});

    }catch (error) {
        next(error)
    }
}
}
export default new Customer();
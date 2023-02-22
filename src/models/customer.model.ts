
import { Schema, model } from 'mongoose';
import { CustomerInterface } from '../interfaces/customer.interface';


const customerSchema = new Schema({
    username: {
        type: String,
    },
    name: {
        type: String,

    },
   
    address:{
        type:String,
    },
    email:{
        type:String,
    },
   
    active: {
        type: Boolean,
        default: false
    },
  
   account:[
       {
           type:Number,
       }
   ],

    tier_and_details: {
        type: [{
            tier: {
                type: String
            },
            active: {
                type:Boolean
            }
        }],
        
    },
}, { timestamps: true });


const CustomerModel = model<CustomerInterface>('customer', customerSchema);
export default CustomerModel;
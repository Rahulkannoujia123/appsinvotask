
import { Schema, model } from 'mongoose';

import { TransactionInterface } from '../interfaces/transaction.interface';


const transactionSchema = new Schema({
  account_id:{
      type:Number,
  },
  transaction_count:{
      type:Number,
  },
  
bucket_start_date:{
    type:Date,
},

bucket_end_date:{
    type:Date,
},
transaction:{
    type: [{
        date: {
            type: String
        },
        amount: {
            type:Number
        },
        transaction_code:{
            type:String
        },
        price:{
            type:String
        },
        total:{
            type:Number,
        },
    }],
    
},

}, { timestamps: true });


const TransactionModel = model<TransactionInterface>('transaction', transactionSchema);
export default TransactionModel;
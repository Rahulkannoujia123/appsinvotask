import { Document, ObjectId } from "mongoose";

export interface TransactionInterface extends Document {
  _id: ObjectId | string;
  account_id: number;
  transaction_count: number;
  bucket_start_date: Date;
  bucket_end_date: Date;
  transaction: Transaction[];
  createdAt: Date;
  updateAt: Date;
}
interface Transaction {
  date: string;
  amount: number;
  transaction_code: string;
  price: string;
  total: number;
}

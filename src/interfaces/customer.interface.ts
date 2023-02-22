import { Document, ObjectId } from "mongoose";

export interface CustomerInterface extends Document {
  _id: ObjectId | string;
  username: string;
  name:string;
  address:string;
 email:string;
 active:boolean;
 accounts:[]
 tier_and_details:Tier_and_details[]
 createdAt: Date,
 updateAt: Date,
}
interface Tier_and_details {
    tier: string;
    active: boolean;
    benifits:[]
}
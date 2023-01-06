import { Document, ObjectId } from "mongoose";

export interface UserInterface extends Document {
  _id: ObjectId | string;
  name: string;
 email:string;
 password:string;
 address:string;
 lat:string;
 long:string;
 isActive:boolean;
 registerAt:string;
 createdAt: Date,
 updateAt: Date,
}
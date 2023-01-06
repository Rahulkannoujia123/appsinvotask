
import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';


const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,

    },
    password: {
        type: String,
        select: false
    },
    address:{
        type:String,
    },
    
    lat:{
       type:String,
    },
    long:{
        type:String,
    },
    isActive: {
        type: Boolean,
        default: false
    },
   registerAt:{
      type:String, 
   }
 
    
  
  
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
const UserModel = model<UserInterface>('user', userSchema);
export default UserModel;
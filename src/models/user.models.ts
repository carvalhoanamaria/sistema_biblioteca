
import { Schema } from 'mongoose';
import mongoose  from 'mongoose';

type PerfilType = 'admin' | 'operator';

export interface IUser {
   name : string;
   email : string;
   password : string;
   document : string;
   profile: PerfilType;
   createAt: string | Date;
}


export const userSchema = new Schema <IUser>({
   name: {
      type: String
   },
   email: {
      type: String
   },
   password: {
    type: String
   },
   document: {
    type: String
   },
   profile: {
      type: String,
      enum: ['admin', 'operator']
    },
   createAt:{
      type: Date,
      default: new Date()
   }
   });


export const User = mongoose.model<IUser>('User',userSchema);
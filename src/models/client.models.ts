
import { Schema } from 'mongoose';
import mongoose  from 'mongoose';


export interface IClient {
   name : string;
   email : string;
   password : string;
   document : string;
   address :  string;
   createAt: string | Date;
}


export const  clientSchema = new Schema <IClient>({
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
   address: {
      type: String
    },
   createAt:{
      type: Date,
      default: new Date()
   }
   });


export const Client = mongoose.model<IClient>('Client',clientSchema);
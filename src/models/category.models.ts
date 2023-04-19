
import { Schema } from 'mongoose';
import mongoose  from 'mongoose';

export interface ICategory {
   description : string;
   code : number;
   createAt: string | Date;
}


export const categorySchema = new Schema <ICategory>({
  description: {
      type: String
   },
   code: {
      type: Number
   },
   createAt:{
      type: Date,
      default: new Date()
   }
   });


export const Category = mongoose.model<ICategory>('Category',categorySchema);
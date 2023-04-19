
import { Schema } from 'mongoose';
import { Types } from 'mongoose';
import mongoose  from 'mongoose';
import { Category ,ICategory } from './category.models';


export interface IBook {
   description : string;
   code : number;
   author : string;
   summary : string;
   year : number;
   publishing_company: string;
   ISBN : number;
   category: Types.ObjectId | ICategory;
   createAt: string | Date;
}


export const bookSchema = new Schema <IBook>({
   description: {
      type: String
   },
   code: {
      type: Number
   },
   author: {
    type: String
   },
   summary: {
    type: String
   },
   year: {
      type: Number
   },
   publishing_company: {
    type: String
   },
   ISBN: {
    type: Number
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
   },
   createAt:{
      type: Date,
      default: new Date()
   }

});


export const Book = mongoose.model<IBook>('Book',bookSchema);
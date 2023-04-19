import { Book, IBook } from "../models/book.models";


class BookRepository{
    getAll(){ 
        return Book.find().populate('category', 'description');
    }

    getByDescription(description: string){ 
        const exp = new RegExp(description, 'i');
        return Book.find({ description: exp }).populate('category', 'description');
     }

     getByAuthor(author: string){ 
        const exp = new RegExp(author, 'i');
        return Book.find({ author: exp}).populate('category', 'description');
     }


     getByCode(code: number){ 
       // return Book.findOne({ code: code});
       return Book.findOne({ code: code}).populate('category', 'description');
     }


     create(book: IBook){
         return Book.create(book);
     }
 
     update(code : number, book: Partial<IBook>){
         return Book.updateOne({ code: code }, { $set: book });
     }
 
     remove(code: number){
        return Book.deleteOne({ code: code });
     }
}


export default new BookRepository();


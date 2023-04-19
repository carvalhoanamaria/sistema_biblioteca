import { ICategory, Category } from "../models/category.models";


class CategoryRepository{

    getAll(){ 
        return Category.find();
    }

    getByCode(code: number){ 
        return Category.findOne({ code: code});
     }
 
     create(category: ICategory){
         return Category.create(category);
     }
 
     update(code : number, category: Partial<ICategory>){
         return Category.updateOne({ code: code }, { $set: category });
     }
 
     remove(code: number){
        return Category.deleteOne({ code: code });
     }
}

export default new CategoryRepository();

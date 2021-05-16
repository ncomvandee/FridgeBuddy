import Mongoose = require("mongoose");


interface IRecipeModel extends Mongoose.Document {
    recipeID: String;
    recipeName: String;
    description: Number;
    instruction: string[];
    ingredientList: string[];
    reviewList: string[];
    videoLink:String;
    avgRate:Number;
    viewers:Number;
}
export {IRecipeModel};
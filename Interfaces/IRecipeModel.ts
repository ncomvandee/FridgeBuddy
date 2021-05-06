import Mongoose = require("mongoose");


interface IRecipeModel extends Mongoose.Document {
    recipeID: String;
    recipeName: String;
    description: Number;
    instruction: String;
    ingredientList: [String];
    reviewList: [{reviewId: String}];
    videoLink:String;
    avgRate:Number;
    viewers:Number;
}
export {IRecipeModel};
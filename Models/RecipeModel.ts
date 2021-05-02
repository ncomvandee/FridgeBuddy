
import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IRecipeModel} from '../Interfaces/IRecipeModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RecipeModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema({
            recipeID: String,
            recipeName: String,
            description: Number,
            instruction: String,
            ingredientList: Array,
            reviewList: Array,
            videoLink:String,
            avgRate:Number,
            viewers:Number
        }, { collection: 'Recipes' });
        
    };

    public createModel(): void {
        this.model = mongooseConnection.model<IRecipeModel>("Recipes", this.schema);
    }

    public retrieveAllRecipes(response:any): any {
        var query = this.model.find({});
        query.exec( (err, recipeArray) => {
            response.json(recipeArray) ;
        });
    }

    public retrieveRecipe(response:any, filter:Object){
        var query = this.model.findOne({filter});
        query.exec(function (err, innerRecipe) {
            if (err) {
                console.log('error retrieving recipe');
            }
            else {
                if (innerRecipe == null) {
                    response.status(404);
                    response.json('{recipeID: Null}');
                }
                else {
                    console.log('Found!' );
                    response.json('{recipeName:' + innerRecipe.recipeName + '}');
                }
            }
        });
    };

}
export {RecipeModel};


import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IRecipeModel} from '../Interfaces/IRecipeModel';
//import { IReviewModel } from "../Interfaces/IReviewModel";

import {ReviewModel} from './ReviewModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RecipeModel {
    public schema:any;
    public model:any;
    public reviewModel:any;

    public constructor() {
        this.createSchema();
        this.createModel();
        
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema({
            recipeId: String,
            recipeName: String,
            description: Number,
            instruction: String,
            ingredientList: [String],
            reviewList: [{reviewId: String}],
            videoLink:String,
            avgRate:Number,
            viewers:Number
        }, { collection: 'recipes' });
        
    };

    public createModel(): void {
        this.model = mongooseConnection.model<IRecipeModel>("recipes", this.schema);
    }

    // Get all recipes
    public retrieveAllRecipes(response:any): any {
        var query = this.model.find({});
        query.exec( (err, recipeArray) => {
            response.json(recipeArray) ;
        });
    }

    // Get recipe by id
    public retrieveRecipe(response:any, filter:Object){
        var query = this.model.findOne(filter);
        query.exec(function (err, innerRecipe) {
            if (err) {
                console.log('error retrieving recipe');
            }
            else {
                if (innerRecipe == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    response.json(innerRecipe);
                }
            }
        });
    };

    //Get recipe by ingredients
    public retrieveRecibeByIngredients(response: any, filter) {
        var query = this.model.find({ingredientList: {$all: filter}});
        query.exec((err, foundRecipe) => {
            if (err) {
                console.log('No recipe found');
            } else {
                if (foundRecipe == null) {
                    response.status(404);
                    response.json('Bad request');
                }
                else {
                    response.json(foundRecipe);
                }
            }
        })
    }

    public addReview(response:any, filter:Object, ReviewId:String){
        
        var query = this.model.findOne({filter});
        let rate:number = 0;
        query.exec(function (err, innerRecipe) {
            if (err) {
                console.log('error retrieving recipe');
            }
            else {
                if (innerRecipe == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!' );
                    for(let i=0; i<innerRecipe.reviewList.length; i++)
                    {
                       rate += innerRecipe.reviewList[i].ra
                    }
                    response.json('{reviewList:' + innerRecipe.reviewList + '}');
                }
            }
        });
    };


    public removeReview(response:any, filter:Object, ReviewId:String){
        
        var query = this.model.findOne({filter});
        query.exec(function (err, innerRecipe) {
            if (err) {
                console.log('error retrieving recipe');
            }
            else {
                if (innerRecipe == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!' );
                    query.reviewList.filter(item => item.id !== ReviewId);
                    response.json('{reviewList:' + innerRecipe.reviewList + '}');
                }
            }
        });
    };

    public refreshRating(response:any, filter:Object){
        
        var query = this.model.findOne({filter});
        let avRate:number = 0;
        query.exec(function (err, innerRecipe) {
            if (err) {
                console.log('error retrieving recipe');
            }
            else {
                if (innerRecipe == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!' );
                    for( let i=0; i<innerRecipe.reviewList.length ; i++)
                    {
                        var query = this.reviewModel.findeOne.where('reviewID',innerRecipe.reviewList[i]);
                        avRate += query.rate;
                    }
                    innerRecipe.avgRate = avRate / innerRecipe.reviewList.length; 
                    response.json('{AvgRate:' + innerRecipe.avgRate + '}');
                }
            }
        });
    };

}
export {RecipeModel};


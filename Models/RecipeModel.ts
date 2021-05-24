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
            recipeImage: String,
            description: String,
            instruction: [],
            ingredientList: [],
            reviewList: [],
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

    public getReviewList(response:any, RecipeId: String, reviewModel: ReviewModel){
        var query = this.model.findOne({recipeId: RecipeId});

        query.exec(function (err, innerRecipe) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerRecipe == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    reviewModel.passReviewList(response, innerRecipe.reviewList);
                }
            }
        });
    };

    // Get User's Favorite Recipe List
    public async passFavoriteList(response: any, filter: any) {
        let fillterArr = [];
        let recipe;

        for (let i = 0; i < filter.length; i++) {
            recipe = await this.model.findOne({recipeId: filter[i]}, function(err, innerRecipe){
                return innerRecipe;
            });
            fillterArr.push(recipe);
        }
        
        response.json(fillterArr)
    }

    //Get recipe by ingredients
    public retrieveRecibeByIngredients(response: any, filter: any) {

        //new array to put case insensitive argument
        let fillterArr = [];
        let size;
        let checkMock = "String";

        if (filter === null || filter.length == 0) {
            response.json(fillterArr);
        }

        // If the filter contain only one argument. it treats as string and cannot use loop
        if (typeof filter === typeof checkMock) {
            fillterArr.push(new RegExp(filter, 'i')); //RegEx for case insensitive
        }
        else {
            for (let i = 0; i < filter.length; i++) {
                fillterArr.push(new RegExp(filter[i], 'i'));
            }
        }

        // Size of the ingredient array
        size = fillterArr.length + 3;
        
        var query = this.model.find({ingredientList: {$in: fillterArr }})
        query.exec((err, foundRecipe) => {
            if (err) {
                console.log(err);
            } else {
                if (foundRecipe == null) {
                    response.status(404);
                    response.json('Bad request');
                }
                else {
                    
                    // New array for result
                    let resultArr = [];

                    for (let i = 0; i < foundRecipe.length; i++) {
                        
                        // If ingredient list is too much longer than the ingredient arguments
                        // that's mean, most of the ingredients are missing
                        if (foundRecipe[i].ingredientList.length <= size) {
                            resultArr.push(foundRecipe[i]);
                        }
                    }

                    response.json(resultArr);
                }
            }
        })
    }

    // Get recipe by cuisine
    public getRecipeByCuisine(response: any, cuisine: string) {
        let query = this.model.findOne({recipeName: new RegExp(cuisine, 'i')});

        query.exec(function (err, foundRecipe) {
            if (err) {
                console.log('error retrieving recipe');
            }
            else {
                if (foundRecipe == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    response.json(foundRecipe);
                }
            }
        });
    }

    // Get top ten recipe by views
    public getTopTenRecipeByViews(response: any) {
        let query = this.model.find().sort({viewers: -1}).limit(10);

        query.exec(function (err, topTenRecipe) {
            if (err) {
                console.log(err);
            }
            else {
                if (topTenRecipe == null || topTenRecipe.length == 0) {
                    response.status(404).send('Bad Request');
                }
                else {
                    response.json(topTenRecipe);
                }
            }
        })
    }

    // Get top ten recipes by rating
    public getTopTenRecipesByRating(response: any) {
        let query = this.model.find().sort({avgRate: -1}).limit(10);

        query.exec(function (err, topTenRecipe) {
            if (err) {
                console.log(err);
            }
            else {
                if (topTenRecipe == null || topTenRecipe.length == 0) {
                    response.status(404).send('Bad Request');
                }
                else {
                    response.json(topTenRecipe);
                }
            }
        })
    }

    // Add new recipe in db
    public addNewRecipe(response: any, newRecipe: Object) {
        this.model.create([newRecipe], (err) => {
            if (err) {
                console.log(err);
                response.status(404).send('Failed to add new recipe');
            }
            else {
                response.status(200).send(newRecipe);
            }
        })
    }

    // Update recipe in db
    public updateRecipe(response: any, recipeId: Object, updatedInfo: Object) {
        var query = this.model.findOne(recipeId);
        query.exec(function (err, foundRecipe) {
            if(err) {
                console.log('error retrieving recipe');
            } else {
                if (foundRecipe == null) {
                    response.status(404);
                    response.json('Bad Request');
                } else {
                    foundRecipe.overwrite(updatedInfo);
                    foundRecipe.save(function(err){
                        if(err)
                        {
                            response.send(err);
                        }                  
                        response.json(foundRecipe.recipeName + ' is updated');
                    });
                }
            }
        })
    }

    // Delete recipe
    public deleteRecipe (response: any, recipeId: Object) {
        this.model.findOneAndDelete(recipeId, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                response.status(200).send('Recipe deleted');
            }
        })
        
    }

    public addReview(response:any, ReviewId: String, recipe:Object){
        var isExisted : boolean = false;
        var query = this.model.findOne(recipe);
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
                    for(let i=0; i< innerRecipe.reviewList.length; i++)
                    {
                       if(innerRecipe.reviewList[i] == ReviewId)
                       {
                         isExisted = true;
                         break;
                       }
                    }
                    if( isExisted === false)
                    {
                        console.log('Found!');
                        innerRecipe.reviewList.push(ReviewId);
                        console.log(innerRecipe.reviewList);
                        innerRecipe.save(function(err){
                            if(err)
                            {
                                response.send(err);
                            }
                        });
                    }
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


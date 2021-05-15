"use strict";
exports.__esModule = true;
exports.RecipeModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var RecipeModel = /** @class */ (function () {
    function RecipeModel() {
        this.createSchema();
        this.createModel();
    }
    RecipeModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            recipeId: String,
            recipeName: String,
            description: String,
            instruction: String,
            ingredientList: [],
            reviewList: [],
            videoLink: String,
            avgRate: Number,
            viewers: Number
        }, { collection: 'recipes' });
    };
    ;
    RecipeModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("recipes", this.schema);
    };
    // Get all recipes
    RecipeModel.prototype.retrieveAllRecipes = function (response) {
        var query = this.model.find({});
        query.exec(function (err, recipeArray) {
            response.json(recipeArray);
        });
    };
    // Get recipe by id
    RecipeModel.prototype.retrieveRecipe = function (response, filter) {
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
    ;
    //Get recipe by ingredients
    RecipeModel.prototype.retrieveRecibeByIngredients = function (response, filter) {
        //new array to put case insensitive argument
        var fillterArr = [];
        var size;
        var checkMock = "String";
        // If the filter contain only one argument. it treats as string and cannot use loop
        if (typeof filter === typeof checkMock) {
            fillterArr.push(new RegExp(filter, 'i')); //RegEx for case insensitive
        }
        else {
            for (var i = 0; i < filter.length; i++) {
                fillterArr.push(new RegExp(filter[i], 'i'));
            }
        }
        // Size of the ingredient array
        size = fillterArr.length + 3;
        var query = this.model.find({ ingredientList: { $in: fillterArr } });
        query.exec(function (err, foundRecipe) {
            if (err) {
                console.log(err);
            }
            else {
                if (foundRecipe == null) {
                    response.status(404);
                    response.json('Bad request');
                }
                else {
                    // New array for result
                    var resultArr = [];
                    for (var i = 0; i < foundRecipe.length; i++) {
                        // If ingredient list is too much longer than the ingredient arguments
                        // that's mean, most of the ingredients are missing
                        if (foundRecipe[i].ingredientList.length <= size) {
                            resultArr.push(foundRecipe[i]);
                        }
                    }
                    response.json(resultArr);
                }
            }
        });
    };
    // Add new recipe in db
    RecipeModel.prototype.addNewRecipe = function (response, newRecipe) {
        this.model.create([newRecipe], function (err) {
            if (err) {
                console.log(err);
                response.status(404).send('Failed to add new recipe');
            }
            else {
                response.status(200).send(newRecipe);
            }
        });
    };
    // Delete recipe
    RecipeModel.prototype.deleteRecipe = function (response, recipeId) {
        this.model.findOneAndDelete(recipeId, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                response.status(200).send('Recipe deleted');
            }
        });
    };
    RecipeModel.prototype.addReview = function (response, filter, ReviewId) {
        var query = this.model.findOne({ filter: filter });
        var rate = 0;
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
                    for (var i = 0; i < innerRecipe.reviewList.length; i++) {
                        rate += innerRecipe.reviewList[i].ra;
                    }
                    response.json('{reviewList:' + innerRecipe.reviewList + '}');
                }
            }
        });
    };
    ;
    RecipeModel.prototype.removeReview = function (response, filter, ReviewId) {
        var query = this.model.findOne({ filter: filter });
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
                    query.reviewList.filter(function (item) { return item.id !== ReviewId; });
                    response.json('{reviewList:' + innerRecipe.reviewList + '}');
                }
            }
        });
    };
    ;
    RecipeModel.prototype.refreshRating = function (response, filter) {
        var query = this.model.findOne({ filter: filter });
        var avRate = 0;
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
                    for (var i = 0; i < innerRecipe.reviewList.length; i++) {
                        var query = this.reviewModel.findeOne.where('reviewID', innerRecipe.reviewList[i]);
                        avRate += query.rate;
                    }
                    innerRecipe.avgRate = avRate / innerRecipe.reviewList.length;
                    response.json('{AvgRate:' + innerRecipe.avgRate + '}');
                }
            }
        });
    };
    ;
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;

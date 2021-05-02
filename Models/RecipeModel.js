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
            recipeID: String,
            recipeName: String,
            description: Number,
            instruction: String,
            ingredientList: Array,
            reviewList: Array,
            videoLink: String,
            avgRate: Number,
            viewers: Number
        }, { collection: 'recipes' });
    };
    ;
    RecipeModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("recipes", this.schema);
    };
    RecipeModel.prototype.retrieveAllRecipes = function (response) {
        var query = this.model.find({});
        query.exec(function (err, recipeArray) {
            response.json(recipeArray);
        });
    };
    RecipeModel.prototype.retrieveRecipe = function (response, filter) {
        var query = this.model.findOne({ filter: filter });
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
                    console.log('Found!');
                    response.json('{recipeName:' + innerRecipe.recipeName + '}');
                }
            }
        });
    };
    ;
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;

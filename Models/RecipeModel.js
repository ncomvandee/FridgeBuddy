"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
            recipeImage: String,
            description: String,
            instruction: [],
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
    RecipeModel.prototype.getReviewList = function (response, RecipeId, reviewModel) {
        var query = this.model.findOne({ recipeId: RecipeId });
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
    ;
    // Get User's Favorite Recipe List
    RecipeModel.prototype.passFavoriteList = function (response, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var fillterArr, recipe, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fillterArr = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < filter.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.model.findOne({ recipeId: filter[i] }, function (err, innerRecipe) {
                                return innerRecipe;
                            })];
                    case 2:
                        recipe = _a.sent();
                        fillterArr.push(recipe);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        response.json(fillterArr);
                        return [2 /*return*/];
                }
            });
        });
    };
    //Get recipe by ingredients
    RecipeModel.prototype.retrieveRecibeByIngredients = function (response, filter) {
        //new array to put case insensitive argument
        var fillterArr = [];
        var size;
        var checkMock = "String";
        if (filter === null || filter.length == 0) {
            response.json(fillterArr);
        }
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
    // Get recipe by cuisine
    RecipeModel.prototype.getRecipeByCuisine = function (response, cuisine) {
        var query = this.model.findOne({ recipeName: new RegExp(cuisine, 'i') });
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
    };
    // Get top ten recipe by views
    RecipeModel.prototype.getTopTenRecipeByViews = function (response) {
        var query = this.model.find().sort({ viewers: -1 }).limit(10);
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
        });
    };
    // Get top ten recipes by rating
    RecipeModel.prototype.getTopTenRecipesByRating = function (response) {
        var query = this.model.find().sort({ avgRate: -1 }).limit(10);
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
    // Update recipe in db
    RecipeModel.prototype.updateRecipe = function (response, recipeId, updatedInfo) {
        var query = this.model.findOne(recipeId);
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
                    foundRecipe.overwrite(updatedInfo);
                    foundRecipe.save(function (err) {
                        if (err) {
                            response.send(err);
                        }
                        response.json(foundRecipe.recipeName + ' is updated');
                    });
                }
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
    RecipeModel.prototype.addReview = function (response, ReviewId, recipe) {
        var isExisted = false;
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
                    for (var i = 0; i < innerRecipe.reviewList.length; i++) {
                        if (innerRecipe.reviewList[i] == ReviewId) {
                            isExisted = true;
                            break;
                        }
                    }
                    if (isExisted === false) {
                        console.log('Found!');
                        innerRecipe.reviewList.push(ReviewId);
                        console.log(innerRecipe.reviewList);
                        innerRecipe.save(function (err) {
                            if (err) {
                                response.send(err);
                            }
                        });
                    }
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

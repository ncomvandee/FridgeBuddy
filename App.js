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
exports.App = void 0;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var RecipeModel_1 = require("./Models/RecipeModel");
var ReviewModel_1 = require("./Models/ReviewModel");
var UserModel_1 = require("./Models/UserModel");
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.recipes = new RecipeModel_1.RecipeModel();
        this.reviews = new ReviewModel_1.ReviewModel();
        this.users = new UserModel_1.UserModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        /**********   RECIPE OPERATION  ************************************************************/
        // Get all recipes
        router.get('/recipes', function (req, res) {
            _this.recipes.retrieveAllRecipes(res);
        });
        // Get only one recipe by id
        router.get('/recipes/find/:recipeId', function (req, res) {
            var id = req.params.recipeId;
            _this.recipes.retrieveRecipe(res, { recipeId: id });
        });
        // Get recipe by ingredients
        router.get('/recipes/byIngredients/', function (req, res) {
            var ingredientsArr = req.query.array;
            _this.recipes.retrieveRecibeByIngredients(res, ingredientsArr);
        });
        // Get recipe by cuisine
        router.get('/recipes/byCuisine/:cuisine', function (req, res) {
            var cuisine = req.params.cuisine;
            _this.recipes.getRecipeByCuisine(res, cuisine);
        });
        // Get top ten recipe by views
        router.get('/recipes/topTenByViews/', function (req, res) {
            _this.recipes.getTopTenRecipeByViews(res);
        });
        // Get top ten recipes by rating
        router.get('/recipes/topTenByRating/', function (req, res) {
            _this.recipes.getTopTenRecipesByRating(res);
        });
        // Get review list of a recipe
        router.get('/recipes/getReviewList/:recipeId', function (req, res) {
            var recipeId = req.params.recipeId;
            _this.recipes.getReviewList(res, recipeId, _this.reviews);
        });
        // Create new recipe
        router.post('/recipes', function (req, res) {
            var newRecipe = req.body;
            _this.recipes.addNewRecipe(res, newRecipe);
        });
        // Update recipe
        router.put('/recipes/:recipeId', function (req, res) {
            var id = req.params.recipeId;
            var updatedInfo = req.body;
            _this.recipes.updateRecipe(res, { reipeId: id }, updatedInfo);
        });
        // Delete recipe
        router["delete"]('/recipes/:recipeId', function (req, res) {
            var id = req.params.recipeId;
            _this.recipes.deleteRecipe(res, { recipeId: id });
        });
        /*******************************************************************************************/
        /**********   REVIEW OPERATION  ************************************************************/
        // Get all reviews
        router.get('/reviews', function (req, res) {
            _this.reviews.retrieveAllReviews(res);
        });
        // Get a review by id
        router.get('/reviews/:reviewId', function (req, res) {
            var id = req.params.reviewId;
            _this.reviews.retrieveReview(res, { reviewId: id });
        });
        // Update a review
        router.put('/reviews/:reviewId', function (req, res) {
            var id = req.params.reviewId;
            var receivedJson = req.body;
            _this.reviews.updateReview(res, receivedJson, id);
        });
        // Create a new review
        router.post('/reviews/:recipeId/', function (req, res) {
            var recipeId = req.params.recipeId;
            var receivedJson = req.body;
            var reviewId = receivedJson.reviewId;
            _this.reviews.model.create([receivedJson], function (err) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (err) {
                        console.log('object creation failed');
                        res.status(404).send('Create failed');
                    }
                    else {
                        console.log('Review #' + reviewId + ' added');
                        this.recipes.addReview(res, reviewId, { recipeId: recipeId });
                        res.status(200).send('Review added');
                    }
                    return [2 /*return*/];
                });
            }); });
        });
        // Delete a review
        router["delete"]('/reviews/:reviewId', function (req, res) {
            var id = req.params.reviewId;
            _this.reviews.deleteReview(res, { reviewId: id });
        });
        /*******************************************************************************************/
        /**********   users OPERATION  *************************************************************/
        // Get all users
        router.get('/users', function (req, res) {
            _this.users.retrieveAllUsers(res);
        });
        // Get user by id
        router.get('/users/:userId', function (req, res) {
            var id = req.params.userId;
            _this.users.retrieveUser(res, { userId: id });
        });
        // Create a user
        router.post('/users', function (req, res) {
            var receivedJson = req.body;
            _this.users.model.create([receivedJson], function (err) {
                if (err) {
                    console.log('object creation failed');
                    res.status(404).send('Create failed');
                }
                else {
                    res.status(200).send(receivedJson);
                }
            });
        });
        // Update user
        router.put('/users/:userId', function (req, res) {
            var id = req.params.userId;
            var receivedJson = req.body;
            _this.users.updateUser(res, receivedJson, id);
        });
        // Delete user
        router["delete"]('/users/:userId', function (req, res) {
            var id = req.params.userId;
            _this.users.deleteUser(res, { userId: id });
        });
        // Get user's favorite recipe list
        router.get('/users/getFavorite/:userId', function (req, res) {
            var userId = req.params.userId;
            _this.users.getFavoriteList(res, userId, _this.recipes);
        });
        // Update user's favorit list by adding a new Recipe
        router.put('/users/addFavorite/:userId/:recipeId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, exist, userId, recipeId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.recipeId;
                        exist = false;
                        // Check if we have a specific recipe
                        return [4 /*yield*/, this.recipes.model.find({ recipeId: id }, function (err, result) {
                                if (err)
                                    throw err;
                                if (result.length != 0) {
                                    exist = true;
                                }
                            })];
                    case 1:
                        // Check if we have a specific recipe
                        _a.sent();
                        // If exist, add to the user's favorite list
                        if (exist) {
                            userId = req.params.userId;
                            recipeId = req.params.recipeId;
                            this.users.addToFavoriteList(res, userId, recipeId);
                        }
                        else {
                            res.status(404);
                            res.json('Bad Request!');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // Update user's favorit list by removing a Recipe
        router.put('/users/removeFavorite/:userId/:recipeId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, exist, userId, recipeId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.recipeId;
                        exist = false;
                        // Check if we have a specific recipe
                        return [4 /*yield*/, this.recipes.model.find({ recipeId: id }, function (err, result) {
                                if (err)
                                    throw err;
                                if (result.length != 0) {
                                    exist = true;
                                }
                            })];
                    case 1:
                        // Check if we have a specific recipe
                        _a.sent();
                        // If exist, add to the user's favorite list
                        if (exist) {
                            userId = req.params.userId;
                            recipeId = req.params.recipeId;
                            this.users.removeFromFavoriteList(res, userId, recipeId);
                        }
                        else {
                            res.status(404);
                            res.json('Bad Request!');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        /*******************************************************************************************/
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use(express.static("img"));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;

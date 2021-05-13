"use strict";
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
        // Get all recipes
        router.get('/recipes', function (req, res) {
            _this.recipes.retrieveAllRecipes(res);
        });
        // Get only one recipe by id
        router.get('/recipes/:recipeId', function (req, res) {
            var id = req.params.recipeId;
            _this.recipes.retrieveRecipe(res, { recipeId: id });
        });
        // Get recipe by ingredients
        router.get('/recipe', function (req, res) {
            var ingredientsArr = req.query.array;
            _this.recipes.retrieveRecibeByIngredients(res, ingredientsArr);
        });
        // Get all reviews
        router.get('/reviews', function (req, res) {
            _this.reviews.retrieveAllReviews(res);
        });
        // Get a review by id
        router.get('/reviews/:reviewId', function (req, res) {
            var id = req.params.reviewId;
            _this.reviews.retrieveReview(res, { reviewId: id });
        });
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
        router.post('/users/', function (req, res) {
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
        //  Update user's favorit list by adding a new Recipe
        router.put('/recipe/addTo/:userId/:recipeId', function (req, res) {
            console.log(req.body);
            var userId = req.params.userId;
            var recipeId = req.params.recipeId;
            _this.users.addToFavoriteList(res, userId, recipeId);
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use(express.static("img"));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;

"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var RecipeModel_1 = require("./Models/RecipeModel");
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.recipes = new RecipeModel_1.RecipeModel();
        // this.reviews = new ReviewModel();
        // this.users = new UserModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
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
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use(express.static("img"));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;

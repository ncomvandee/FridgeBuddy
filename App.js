"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
// Temporary code for checking connection to mongo
var Mongoose = require("mongoose");
var DataAccess_1 = require("./DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        // this.recipes = new RecipeModel();
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
        var router = express.Router();
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        //this.expressApp.use('/images', express.static(__dirname+'/img'));
        this.expressApp.use(express.static("img"));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
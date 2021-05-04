"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: String,
            password: String,
            email: String,
            firstName: String,
            lastName: String,
            isPremium: Boolean,
            favoriteList: Array,
            recentlyView: Array
        }, { collection: 'users' });
    };
    ;
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("users", this.schema);
    };
    UserModel.prototype.retrieveAllUsers = function (response) {
        var query = this.model.find({});
        query.exec(function (err, userArray) {
            response.json(userArray);
        });
    };
    UserModel.prototype.retrieveUser = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('{userID: Null}');
                }
                else {
                    console.log('Found!');
                    response.json(innerUser);
                }
            }
        });
    };
    ;
    UserModel.prototype.addFavoriteList = function (response, UserId, RecipeId) {
        var query = this.model.findeOne({ UserId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('{userID: Null}');
                }
                else {
                    console.log('Found!');
                    innerUser.favoritList.add(RecipeId);
                }
            }
        });
    };
    ;
    UserModel.prototype.getFavoriteList = function (response, UserId) {
        var query = this.model.findeOne({ UserId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('{userID: Null}');
                }
                else {
                    console.log('Found!');
                    response.json(innerUser.favoritList);
                    // TASK: need to return list of recipe objects, not list of recipeID
                }
            }
        });
    };
    ;
    UserModel.prototype.removeFavoriteList = function (response, UserId, RecipeId) {
        var query = this.model.findeOne({ UserId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('{userID: Null}');
                }
                else {
                    console.log('Found!');
                    query.innerUser.favoritList.filter(function (item) { return item.id !== RecipeId; });
                    response.json(innerUser.favoritList);
                }
            }
        });
    };
    ;
    return UserModel;
}());
exports.UserModel = UserModel;

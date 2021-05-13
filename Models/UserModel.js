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
            favoriteList: [],
            recentlyView: []
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
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    response.json(innerUser);
                }
            }
        });
    };
    ;
    UserModel.prototype.addToFavoriteList = function (response, UserId, RecipeId) {
        var isExisted = false;
        var query = this.model.findOne({ userId: UserId });
        //query.where('userId').It(UserId);
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request addToFavoriteList!');
                }
                else {
                    for (var favorite in innerUser.favoriteList) {
                        if (favorite == RecipeId) {
                            isExisted = true;
                            break;
                        }
                    }
                    if (isExisted == false) {
                        console.log('Added to favorite List!');
                        console.log(innerUser.favoriteList);
                        innerUser.favoriteList.push(RecipeId);
                        console.log('RecpieId is:' + RecipeId);
                        console.log(innerUser);
                        innerUser.save(function (err) {
                            if (err) {
                                response.send(err);
                            }
                            response.json(RecipeId + ' is added to favorite List!');
                        });
                    }
                    else {
                        response.json(innerUser);
                        response.json('Already Existed in the Favorite List!');
                    }
                }
            }
        });
    };
    ;
    UserModel.prototype.getFavoriteList = function (response, UserId) {
        var query = this.model.findOne({ UserId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request');
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
        var query = this.model.findOne({ UserId: UserId });
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request');
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

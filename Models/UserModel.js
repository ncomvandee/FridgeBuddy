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
            userID: String,
            password: String,
            email: String,
            firstName: String,
            lastName: String,
            isPremium: Boolean,
            favoritList: Array,
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
        var query = this.model.findOne({ filter: filter });
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
                    response.json('{userID:' + innerUser.userID + '}');
                }
            }
        });
    };
    ;
    return UserModel;
}());
exports.UserModel = UserModel;

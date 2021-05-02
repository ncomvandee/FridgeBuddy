"use strict";
exports.__esModule = true;
exports.ReviewModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var ReviewModel = /** @class */ (function () {
    function ReviewModel() {
        this.createSchema();
        this.createModel();
    }
    ReviewModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            reviewID: String,
            comment: String,
            writer: String,
            date: String,
            rate: Number
        }, { collection: 'reviews' });
    };
    ;
    ReviewModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("reviews", this.schema);
    };
    ReviewModel.prototype.retrieveAllReviews = function (response) {
        var query = this.model.find({});
        query.exec(function (err, recipeArray) {
            response.json(recipeArray);
        });
    };
    ReviewModel.prototype.retrieveReview = function (response, filter) {
        var query = this.model.findOne({ filter: filter });
        query.exec(function (err, innerRecipe) {
            if (err) {
                console.log('error retrieving review');
            }
            else {
                if (innerRecipe == null) {
                    response.status(404);
                    response.json('{reviewID: Null}');
                }
                else {
                    console.log('Found!');
                    response.json('{reviewName:' + innerRecipe.recipeName + '}');
                }
            }
        });
    };
    ;
    return ReviewModel;
}());
exports.ReviewModel = ReviewModel;
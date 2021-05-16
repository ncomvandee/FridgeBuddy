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
            reviewId: String,
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
        var query = this.model.findOne(filter);
        query.exec(function (err, innerReview) {
            if (err) {
                console.log('error retrieving review');
            }
            else {
                if (innerReview == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    console.log('Found!');
                    response.json(innerReview);
                }
            }
        });
    };
    ;
    ReviewModel.prototype.updateReview = function (response, filter, reviewId) {
        var query = this.model.findOne(reviewId);
        query.exec(function (err, innerReview) {
            if (err) {
                console.log('error retrieving review');
            }
            else {
                if (innerReview == null) {
                    response.status(404);
                    response.json('Bad Request');
                }
                else {
                    innerReview.overwrite(filter);
                    innerReview.save(function (err) {
                        if (err) {
                            response.send(err);
                        }
                        response.json("Review #" + innerReview.reviewId + ' was updated.');
                    });
                }
            }
        });
    };
    return ReviewModel;
}());
exports.ReviewModel = ReviewModel;

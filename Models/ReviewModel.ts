import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IReviewModel} from '../Interfaces/IReviewModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ReviewModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema({
            reviewId: String,
            comment: String,
            writer: String,
            date: String,
            rate: Number
        }, { collection: 'reviews' });
        
    };

    public createModel(): void {
        this.model = mongooseConnection.model<IReviewModel>("reviews", this.schema);
    }

    public retrieveAllReviews(response:any): any {
        var query = this.model.find({});
        query.exec( (err, recipeArray) => {
            response.json(recipeArray);
        });
    }

    public retrieveReview(response:any, filter:Object){
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

    public updateReview(response:any, filter:Object, reviewId:String) {
        var query = this.model.findOne({reviewId});
        query.exec(function (err, innerReview) {
            if(err) {
                console.log('error retrieving review');
            } else {
                if (innerReview == null) {
                    response.status(404);
                    response.json('Bad Request');
                } else {
                    innerReview.overwrite(filter);
                    innerReview.save(function(err){
                        if(err)
                        {
                            response.send(err);
                        }                  
                        response.json("Review #" + innerReview.reviewId + ' was updated.')
                    });
                }
            }
        })
    }

}
export {ReviewModel};


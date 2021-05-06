import Mongoose = require("mongoose");


interface IReviewModel extends Mongoose.Document {
    reviewID: String;
    comment: String;
    writer: {userId: String};
    date: String;
    rate: Number;
}
export {IReviewModel};
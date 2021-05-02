
import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import { IUsereModel } from "../Interfaces/IUserModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema({
            userID: String,
            password: String,
            email: String,
            firstName: String,
            lastName: String,
            isPremium: Boolean,
            favoritList:Array,
            recentlyView:Array,
        }, { collection: 'users' });
        
    };

    public createModel(): void {
        this.model = mongooseConnection.model<IUsereModel>("users", this.schema);
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, userArray) => {
            response.json(userArray) ;
        });
    }

    public retrieveUser(response:any, filter:Object){
        var query = this.model.findOne({filter});
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
                    console.log('Found!' );
                    response.json('{userID:' + innerUser.userID + '}');
                }
            }
        });
    };

}
export {UserModel};


import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import { IUsereModel } from "../Interfaces/IUserModel";
import {IRecipeModel} from '../Interfaces/IRecipeModel';

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
            userId: String,
            password: String,
            email: String,
            firstName: String,
            lastName: String,
            isPremium: Boolean,
            favoriteList: [],
            recentlyView: [],
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

    public addToFavoriteList(response:any, UserId: String, RecipeId: String){
        var isExisted : boolean = false;
        var query = this.model.findOne({userId: UserId});
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request!');
                }
                else {
                    console.log('favoriteList is:'+ innerUser.favoriteList);
                    for(let i=0; i< innerUser.favoriteList.length; i++)
                    {
                       if(innerUser.favoriteList[i] == RecipeId)
                       {
                         isExisted = true;
                         break;
                       }
                    }
                    if( isExisted === false)
                    {
                       console.log('Added to favorite List!');
                       innerUser.favoriteList.push(RecipeId);
                       innerUser.save(function(err){
                           if(err)
                           {
                               response.send(err);
                           }                  
                           response.json(RecipeId + ' is added to favorite List!');
                       });

                    }
                    else
                    {
                       response.json('Duplicate!');
                    }
                }
            }
        });
    };

    
    public removeFromFavoriteList(response:any, UserId: String, RecipeId: String){
        var isExisted : boolean = false;
        var query = this.model.findOne({userId: UserId});
        query.exec(function (err, innerUser) {
            if (err) {
                console.log('error retrieving user');
            }
            else {
                if (innerUser == null) {
                    response.status(404);
                    response.json('Bad Request!');
                }
                else {
                    console.log('favoriteList is:'+ innerUser.favoriteList);
                    for(let i=0; i< innerUser.favoriteList.length; i++)
                    {
                       if(innerUser.favoriteList[i] == RecipeId)
                       {
                         isExisted = true;
                         console.log('removing from favorite List!');
                         innerUser.favoriteList.splice(i, RecipeId);
                         innerUser.save(function(err){
                            if(err)
                            {
                               response.send(err);
                            }                  
                            response.json(RecipeId + ' is removed from favorite List!');
                           });
                           break;
                        }
                    }  
                    
                    if( isExisted === false)
                    {
                        console.log('Not found in User favorite List!');
                        response.status(404);
                        response.json('Bad Request!');
                    }
                }
            }
        });
    };


    public getFavoriteList(response:any, UserId: Object){
        var query = this.model.findOne({UserId});

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

    public removeFavoriteList(response:any, UserId: Object, RecipeId: String){
        var query = this.model.findOne({UserId});
        
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
                    query.innerUser.favoritList.filter(item => item.id !== RecipeId);
                    response.json(innerUser.favoritList);
                }
            }
        });
    };
}
export {UserModel};


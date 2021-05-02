import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// Temporary code for checking connection to mongo
var Mongoose = require("mongoose");
var DataAccess_1 = require("./DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;

class App {
    public expressApp: express.Application;
    public idGenerator: number;

    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        // this.recipes = new RecipeModel();
        // this.reviews = new ReviewModel();
        // this.users = new UserModel();
        
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        let router = express.Router();

        router.get('/', (req, res) => {
            res.send("This is home page");
        })
        
        this.expressApp.use('/', router);

    }



}

export {App};
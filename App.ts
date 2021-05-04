import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import {RecipeModel} from './Models/RecipeModel';
import {ReviewModel} from './Models/ReviewModel';
import {UserModel} from './Models/UserModel';


class App {
    public expressApp: express.Application;
    public idGenerator: number;
    public recipes: RecipeModel;
    public reviews: ReviewModel;
    public users: UserModel;

    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.recipes = new RecipeModel();
        this.reviews = new ReviewModel();
        this.users = new UserModel();
        
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        let router = express.Router();

        // Get all recipes
        router.get('/recipes', (req, res) => {
            this.recipes.retrieveAllRecipes(res);
        });

        // Get only one recipe by id
        router.get('/recipes/:recipeId', (req, res) => {
            let id = req.params.recipeId;
            this.recipes.retrieveRecipe(res, {recipeId: id});
        });

        // Get all reviews
        router.get('/reviews', (req, res) => {

            this.reviews.retrieveAllReviews(res);
        });

        // Get a review by id
        router.get('/reviews/:reviewId', (req, res) => {

            let id = req.params.reviewId;
            this.reviews.retrieveReview(res, {reviewId: id});
        });

        // Get all users
        router.get('/users', (req, res) => {

            this.users.retrieveAllUsers(res);
        });

        // Get user by id
        router.get('/users/:userId', (req, res) => {

            let id = req.params.userId;
            this.users.retrieveUser(res, {userId: id});
        });

        router.post('/users/', (req, res) => {
            
            var receivedJson = req.body;
            this.users.model.create([receivedJson], (err) => {
                if (err) {
                    console.log('object creation failed');
                    res.status(404).send('Create failed');
                } else {
                    res.status(200).send(receivedJson);
                }
            });
        });

        this.expressApp.use('/', router);
        
        this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
        this.expressApp.use(express.static("img"));
        this.expressApp.use('/', express.static(__dirname+'/pages'));

    }



}

export {App};
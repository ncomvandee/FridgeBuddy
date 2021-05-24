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
        this.expressApp.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
         });
    }

    private routes(): void {

        let router = express.Router();


        /**********   RECIPE OPERATION  ************************************************************/

        // Get all recipes
        router.get('/recipes', (req, res) => {
            this.recipes.retrieveAllRecipes(res);
        });

        // Get only one recipe by id
        router.get('/recipes/find/:recipeId', (req, res) => {
            let id = req.params.recipeId;
            this.recipes.retrieveRecipe(res, {recipeId: id});
        });

        // Get recipe by ingredients
        router.get('/recipes/byIngredients/', (req, res) => {
            let ingredientsArr = req.query.array;
            this.recipes.retrieveRecibeByIngredients(res, ingredientsArr);
        })

        // Get recipe by cuisine
        router.get('/recipes/byCuisine/:cuisine', (req, res) => {
            let cuisine = req.params.cuisine;

            this.recipes.getRecipeByCuisine(res, cuisine);
        })

        // Get top ten recipe by views
        router.get('/recipes/topTenByViews/', (req, res) => {
            this.recipes.getTopTenRecipeByViews(res);
        })

        // Get top ten recipes by rating
        router.get('/recipes/topTenByRating/', (req, res) => {
            this.recipes.getTopTenRecipesByRating(res);
        })

        // Get review list of a recipe
        router.get('/recipes/getReviewList/:recipeId', (req, res) => {
            let recipeId = req.params.recipeId;

            this.recipes.getReviewList(res, recipeId, this.reviews);
        })

        // Create new recipe
        router.post('/recipes', (req, res) => {
            let newRecipe = req.body;
            this.recipes.addNewRecipe(res, newRecipe);
        })

        // Update recipe
        router.put('/recipes/:recipeId', (req, res) => {
            let id = req.params.recipeId;
            let updatedInfo = req.body;

            this.recipes.updateRecipe(res, {reipeId: id}, updatedInfo);
        })

        // Delete recipe
        router.delete('/recipes/:recipeId', (req, res) => {
            let id = req.params.recipeId;

            this.recipes.deleteRecipe(res, {recipeId: id});
        })

        /*******************************************************************************************/

        /**********   REVIEW OPERATION  ************************************************************/
        // Get all reviews
        router.get('/reviews', (req, res) => {
            this.reviews.retrieveAllReviews(res);
        });

        // Get a review by id
        router.get('/reviews/:reviewId', (req, res) => {
            let id = req.params.reviewId;
            this.reviews.retrieveReview(res, {reviewId: id});
        });

        // Update a review
        router.put('/reviews/:reviewId', (req, res) => {
            let id = req.params.reviewId;
            var receivedJson = req.body;
            this.reviews.updateReview(res, receivedJson, id);
        });
        
        // Create a new review
        router.post('/reviews/:recipeId/', (req, res) => {
            var recipeId = req.params.recipeId;
            var receivedJson = req.body;
            var reviewId = receivedJson.reviewId;
            this.reviews.model.create([receivedJson], async (err) => {
                if (err) {
                    console.log('object creation failed');
                    res.status(404).send('Create failed');
                } else {
                    console.log('Review #' + reviewId + ' added');
                    this.recipes.addReview(res, reviewId, {recipeId: recipeId});
                    res.status(200).send('Review added');
                }
            });
        });

        // Delete a review
        router.delete('/reviews/:reviewId', (req, res) => {
            let id = req.params.reviewId;
            this.reviews.deleteReview(res, {reviewId: id});
        });

        /*******************************************************************************************/

        
        /**********   users OPERATION  *************************************************************/

        // Get all users
        router.get('/users', (req, res) => {
            this.users.retrieveAllUsers(res);
        });

        // Get user by id
        router.get('/users/:userId', (req, res) => {
            let id = req.params.userId;
            this.users.retrieveUser(res, {userId: id});
        });

        // Create a user
        router.post('/users', (req, res) => { 
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

        // Update user
        router.put('/users/:userId', (req, res) => {
            let id = req.params.userId;
            var receivedJson = req.body;
            this.users.updateUser(res, receivedJson, id);
        });

        // Delete user
        router.delete('/users/:userId', (req, res) => {
            let id = req.params.userId;

            this.users.deleteUser(res, {userId: id});
        })

        // Get user's favorite recipe list
        router.get('/users/getFavorite/:userId', (req, res) => {
            let userId = req.params.userId;

            this.users.getFavoriteList(res, userId, this.recipes);
        })

        // Update user's favorit list by adding a new Recipe
        router.put('/users/addFavorite/:userId/:recipeId', async (req, res) => { 
            let id = req.params.recipeId;
            let exist = false;
            
            // Check if we have a specific recipe
            await this.recipes.model.find({recipeId: id}, function(err, result) {
                if (err) throw err;
                if(result.length != 0) {
                    exist = true;
                }
            });
            
            // If exist, add to the user's favorite list
            if(exist){
                var userId = req.params.userId;
                var recipeId = req.params.recipeId;           
                this.users.addToFavoriteList(res, userId, recipeId);
            } else {
                res.status(404);
                res.json('Bad Request!');
            }
        });

        // Update user's favorit list by removing a Recipe
        router.put('/users/removeFavorite/:userId/:recipeId', async (req, res) => { 
            let id = req.params.recipeId;
            let exist = false;
            
            // Check if we have a specific recipe
            await this.recipes.model.find({recipeId: id}, function(err, result) {
                if (err) throw err;
                if(result.length != 0) {
                    exist = true;
                }
            });
            
            // If exist, add to the user's favorite list
            if(exist){
                var userId = req.params.userId;
                var recipeId = req.params.recipeId;           
                this.users.removeFromFavoriteList(res, userId, recipeId);
            } else {
                res.status(404);
                res.json('Bad Request!');
            }
        });

        /*******************************************************************************************/

        this.expressApp.use('/', router);
        
        this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
        this.expressApp.use(express.static("img"));
        this.expressApp.use('/', express.static(__dirname+'/pages'));

    }



}

export {App};
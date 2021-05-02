import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

class App {
    public expressApp: express.Application;
    public idGenerator: number;

    constructor() {
        this.expressApp = express();
        this.middleware();
        
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

}
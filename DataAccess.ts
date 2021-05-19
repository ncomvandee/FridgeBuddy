import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    //static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@localhost:27017/fridge?authSource=admin';
    static DB_CONNECTION_STRING:string = 'mongodb+srv://FridgeBuddy:ilovesaasclass@fridgebuddy.fych5.mongodb.net/fridge?retryWrites=true&w=majority'

    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();
export {DataAccess};
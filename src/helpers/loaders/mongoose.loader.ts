/**
 * Function: ConnectMongoose
 * 
 * This function establishes a connection to a MongoDB database using the Mongoose library.
 * It uses the provided environment variables to construct the MongoDB connection URL.
 * If the connection fails, an error is logged and the process is exited with a non-zero status code.
 * 
 * @throws {Error} If there is an error while connecting to the database
 */

import mongoose from 'mongoose';
import { Logger } from '../loggin/logger';

export async function ConnectMongoose() {
    try {
        // Start mongoDB connection
        const MongoUrl = `mongodb://${process.env.USERDB}:${process.env.PASSWORDDB}@ac-aemgtkt-shard-00-00.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-01.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-02.unqyghm.mongodb.net:27017/?replicaSet=atlas-y8oxsk-shard-0&ssl=true&authSource=admin`;
        await mongoose.connect(MongoUrl, {
            dbName: 'ChallengeBackDanielPalma',
        });
    } catch (error) {
        Logger.error('Error while conecting to database mongo DB: \n\n' + error);
        process.exit(1);
    }
}

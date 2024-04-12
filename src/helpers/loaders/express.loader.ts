/**
 * This code snippet exports a function called `InitExpress` and a constant `App`.
 * 
 * `InitExpress` is a function that initializes an Express server. It sets up the server to listen on a specified port, parses incoming JSON requests using the `body-parser` middleware, and logs server startup information using the `Logger` from the `../loggin/logger` module.
 * 
 * `App` is an instance of the Express application.
 */

import express from 'express';
import bodyParser from 'body-parser';
import { Logger } from '../loggin/logger';

export function InitExpress() {
    
    try {
        const Port = process.env.DEFAULT_PORT || process.env.PORT;
        App.use(bodyParser.json());

        // Start server
        const Server = App.listen(Port, () => {
            Logger.info(`Server listening in: ${JSON.stringify(Server.address())}`);
        });
    } catch (error) {
        Logger.error('Error while loading express: \n\n' + error);
        process.exit(1);
    }
}

export const App = express();

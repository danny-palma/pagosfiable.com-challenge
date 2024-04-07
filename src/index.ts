/**
 * This code snippet is a script that starts the main process of the application.
 * It imports the necessary modules and executes the `LoadApp` function from the `index.scripts` file.
 * It also sets the routes using the `SetRoutes` function from the `index.route` file.
 * If any error occurs during the loading process, it logs the error using the `Logger` module.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ExecuteLoaders as LoadApp } from './helpers/index.scripts';
import { Logger } from './helpers/loggin/logger';
import { SetRoutes } from './routes/index.route';

try {
    Logger.info('Main Process Started');
    LoadApp().then(SetRoutes);
} catch (error) {
    Logger.error('Error while loading app: \n\n' + error);
}

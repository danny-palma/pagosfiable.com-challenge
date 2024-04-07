/**
 * The code snippet imports necessary modules and controllers for handling different routes in an Express application. 
 * It includes the App module from express.loader for setting up the server and the Logger module from logger for logging information and errors. 
 * Controllers for handling requests related to new brands, new products, new users, product prices, and product listings are also imported.
 *
 + The SetRoutes function is defined to configure the application's routes. 
 + It uses the App object to define GET and POST endpoints for various functionalities,
 + such as fetching product prices (/price/:user_id/:nombre_producto), 
 * listing products (/products), 
 * creating a new brand (/newbrand), 
 * creating a new product (/newproduct),
 * and registering a new user (/newuser). 
 * The function logs the start and completion of the route setting process and catches and logs any errors that occur during this process.
 */

import { App } from '../helpers/loaders/express.loader';
import { Logger } from '../helpers/loggin/logger';
import { ControllerNewBrand } from './newbrand/newbrand.controller';
import { ControllerNewProduct } from './newproduct/newproduct.controller';
import { ControllerNewUser } from './newuser/newuser.controller';
import { ControllerPrice } from './price/price.controller.get';
import { ControllerProducts } from './products/products.controller.get';

export function SetRoutes() {
    try {
        Logger.info('Setting routes...');
        App.get('/price/:user_id/:nombre_producto', ControllerPrice);
        App.get('/products', ControllerProducts);
        App.post('/newbrand', ControllerNewBrand);
        App.post('/newproduct', ControllerNewProduct);
        App.post('/newuser', ControllerNewUser);
        Logger.info('Finished.');
    } catch (error) {
        Logger.error(`Error while setting routes!: \n\n ${error}`);
    }
}

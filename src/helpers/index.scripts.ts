/**
 * Executes the loaders to initialize the application.
 * 
 * @returns {Promise<void>} A promise that resolves when the loaders have finished executing.
 * @throws {Error} If there is an error while loading the application.
 */

import { InitExpress as InitExpress } from './loaders/express.loader';
import { ConnectMongoose as InitMongoose } from './loaders/mongoose.loader';
import { Logger } from './loggin/logger';

export async function ExecuteLoaders() {
    const StartLoading = Date.now();
    Logger.info('Loading App...');
    try {
        Logger.debug('Loading mongoose...');
        await InitMongoose();
        Logger.debug('ok');
        Logger.debug('Loading express...');
        InitExpress();
        Logger.debug('ok');
        const FinishedLoading = Date.now();
        Logger.debug(`Time: ${FinishedLoading - StartLoading} ms`);
    } catch (error) {
        Logger.error('Error while loading app: \n\n' + error);
        process.exit(1);
    }
    Logger.info('Finished...');
}

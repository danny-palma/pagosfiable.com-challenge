/**
 * This code snippet initializes a NodeCache client and logs a debug message using the Logger module.
 * 
 * The NodeCache client is created with a standard time-to-live (TTL) of 100 seconds and a check period of 30 seconds.
 * 
 * The Logger module is imported from '../loggin/logger' and is used to log a debug message indicating that the node-cache library has been loaded.
 */

import NodeCache from 'node-cache';
import { Logger } from '../loggin/logger';

// Configurar NodeCache
export const CacheClient = new NodeCache({ stdTTL: 100, checkperiod: 30 });
Logger.debug('Library node-cache loaded!');

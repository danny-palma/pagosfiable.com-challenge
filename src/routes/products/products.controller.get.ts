/**
 * The function uses a try-catch block for error handling. Within the try block, it calls ProductModel.find({ Stock: { $gte: 1 } }) to query 
 * the database for products with sufficient stock. The await keyword is used to wait for the promise returned by find to resolve, 
 * and the result is stored in the variable Products. Then, it uses Res.json(Products) to send the found products back to the client in JSON format.
 * If an error occurs during the database query or any other part of the try block, execution moves to the catch block.
 * Inside the catch block, the error is logged using Logger.error(), and a response with a status code of 500 (Internal Server Error)
 * is sent back to the client using Res.status(500).json({ status: 500, message: 'Internal Server Error' }).
 */
import { Request, Response } from 'express';
import { Logger } from '../../helpers/loggin/logger';
import { ProductModel } from '../../helpers/models/product.model';

export async function ControllerProducts(Req: Request, Res: Response) {
    try {
        const Products = await ProductModel.find({ Stock: { $gte: 1 } });

        Res.json(Products);
    } catch (error) {
        Logger.error(`Error with Controller Price: \n\n  ${error}`);
        Res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

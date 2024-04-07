/**
 * ControllerNewBrand function
 * 
 * This function handles the creation of a new brand. It expects a request object (Req) and a response object (Res) as parameters.
 * 
 * @param {Request} Req - The request object containing the brand name in the body.
 * @param {Response} Res - The response object used to send the HTTP response.
 * @throws {Error} - If there is an error during the creation of the brand, an error is logged and a 500 Internal Server Error response is sent.
 */

import { Request, Response } from 'express';
import { BrandModel } from '../../helpers/models/brand.model';
import { Logger } from '../../helpers/loggin/logger';

export async function ControllerNewBrand(Req: Request, Res: Response) {
    try {
        const { Name } = Req.body;

        if (!Name || typeof Name !== 'string') {
            Res.status(400).json({
                status: 400,
                message: 'Missing Name property or invalid type in body request',
            });
        }

        const NewBrandModel = new BrandModel({ Name });

        await NewBrandModel.save();
        Res.sendStatus(201);
    } catch (error) {
        Logger.error(`Error in Controller new brand: \n\n ${error}`);
        Res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}

/**
 * ControllerPrice function handles the logic for retrieving price information for a product search.
 * 
 * @param Req - The request object from Express.
 * @param Res - The response object from Express.
 * @returns void
 */

import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { FindUserByIdUsingCache } from '../../helpers/models/users.model';
import { FindProductByNameUsingCache } from '../../helpers/models/product.model';
import { FindBrandByIdUsingCache } from '../../helpers/models/brand.model';

interface ISearchResponse {
    user: {
        Username: string;
        Email: string;
    };
    search: {
        ProductName: string;
        Price: number;
        Brand: string;
        Stock: number;
    }[];
}

export async function ControllerPrice(Req: Request, Res: Response) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_id, nombre_producto } = Req.params;
    const SearchResponse: ISearchResponse = {
        user: {
            Username: '',
            Email: '',
        },
        search: [],
    };

    if (!isValidObjectId(user_id)) {
        Res.status(400).json({
            status: 400,
            message: 'Missing user_id param or is invalid id',
        });
        return;
    }
    if (!nombre_producto || typeof nombre_producto !== 'string') {
        Res.status(400).json({
            status: 400,
            message: 'Missing nombre_producto param or is invalid type',
        });
        return;
    }

    const User = await FindUserByIdUsingCache(user_id);

    if (!User) {
        Res.status(404).json({
            status: 404,
            message: 'This user not exist',
        });
        return;
    }

    SearchResponse.user.Username = User.Username;
    SearchResponse.user.Email = User.Email;

    const ProductSearchResult = await FindProductByNameUsingCache(nombre_producto);
    for (let Index = 0; Index < ProductSearchResult.length; Index++) {
        const Product = ProductSearchResult[Index];
        const Brand = await FindBrandByIdUsingCache(Product.Brand);
        SearchResponse.search.push({
            ProductName: Product.Name,
            Brand: Brand?.Name || '',
            Price: User.BrandsOfferID.some((ID) => ID.toString() === Brand?._id.toString())
                ? Product.OfferPrice
                : Product.Price,
            Stock: Product.Stock,
        });
    }

    Res.json(SearchResponse);
}

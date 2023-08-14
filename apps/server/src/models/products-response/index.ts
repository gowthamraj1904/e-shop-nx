import { IProduct } from '@libs/shared/interfaces';
import { IApiResponse } from '@server/models';

interface IProductsApiResponse extends IApiResponse {
    products?: IProduct[];
}

export { IProductsApiResponse };

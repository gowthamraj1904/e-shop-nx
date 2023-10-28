import { NextFunction, Request } from 'express';

export default class CategoriesService {
    public async getCategories(req: Request, next: NextFunction): Promise<[]> {
        try {
            return [];
        } catch (error: unknown) {
            next(error);
        }
    }
}

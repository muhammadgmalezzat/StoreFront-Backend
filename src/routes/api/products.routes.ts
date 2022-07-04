import ProductModel from "../../models/product";
import { Router,Request, Response, NextFunction } from "express";

const productModel = new ProductModel();
const routes = Router();


routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const result = await productModel.createProduct(req.body);
        //console.log(req.body.user_name);
        res.json({
            message: `product created successfully `,
            data: { result }
        })
        res.json(result);
    } catch (error) {
        next(error);
    }
});

routes.get('/', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await productModel.getAllProducts()
        res.json({
            data: { ...products },
            message: 'All products were retrieved successfully'
        })
    } catch (error) {
        next(error)
    }
});


export default routes;
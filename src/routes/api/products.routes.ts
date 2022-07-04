import ProductModel from "../../models/product";
import { Router,Request, Response, NextFunction } from "express";

const productModel = new ProductModel();
const routes = Router();

//create product
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
//get all products
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

//get one product
routes.get('/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.getOneProduct(
            req.query.id as unknown as number
        )
        res.json({
            data: { ...product },
            meesage: 'product retrieved successfully '
        })
    } catch (error) {
        next(error)
    }
});


routes.patch('/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.updateOneProduct(req.body)
        res.json({
            data: { product },
            message: 'product updated successfully'
        })
    } catch (error) {
        next(error)
    }
});


routes.delete('/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.deleteOneProduct(
            req.query.id as unknown as number
        )
        res.json({
            data: { ...product },
            message: 'product is deleted successfully'
        })
    } catch (error) {
        next(error)
    }
});



export default routes;
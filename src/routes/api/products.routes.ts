import ProductModel from "../../models/product";
import { Router,Request, Response, NextFunction } from "express";
import validatingToken from "../../middlewares/authorization"


const productModel = new ProductModel();
const routes = Router();

//create product
routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const result = await productModel.createProduct(req.body);
        //console.log(req.body.user_name);
        res.json({
            message: `product created successfully `,
            data: { ...result }
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
            req.params.id as unknown as number
        )
        if (product === undefined) {
            res.json({
            message: 'product is not found in the list of products '
        })
        }else {
            res.json({
            data: { ...product },
            message: 'product is showed successfully'
        })}
    } catch (error) {
        next(error)
    }
});

//update one product
routes.patch('/:id',validatingToken, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.updateOneProduct(req.body)
        
        res.json({
            data: { ...product },
            message: 'product updated successfully'
        })
    } catch (error) {
        next(error)
    }
});


routes.delete('/:id',validatingToken, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.deleteOneProduct(
            req.params.id as unknown as number
        )
        if (product === undefined) {
            res.json({
            message: 'product is not deleted '
        })
        }else {
            res.json({
            data: { ...product },
            message: 'product is deleted successfully'
        })}
    } catch (error) {
        next(error)
    }
});




export default routes;
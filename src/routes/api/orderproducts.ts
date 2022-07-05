import { Router ,Request, Response, NextFunction } from "express";
import OrderProductModel    from "../../models/orderproducts";
import validatingToken from "../../middlewares/authinticate"


const orderProduct = new OrderProductModel;

const routes = Router();


//create endpoint
routes.post('/',validatingToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const result = await orderProduct.createorderProduct(req.body);
        res.json({
            message: `orderProduct created successfully `,
            data: { result }
        })
        res.json(result);
    } catch (error) {
        next(error);
    }
});


routes.get('/',validatingToken, async (req: Request,res: Response,next: NextFunction) => {
    try {
        const result = await orderProduct.getAllProducts_orders()
        res.json({
            data: { ...result },
            message: 'products in order were retrieved successfully'
        })
    } catch (error) {
        next(error)
    }
});


routes.get('/:id',validatingToken, async (req: Request,res: Response,next: NextFunction) => {
    try {
        const result = await orderProduct.getOneProducts_orders(
            req.params.id as unknown as number
        )
        res.json({
            data: { ...result },
            meesage: 'products in order were retrieved successfully '
        })
    } catch (error) {
        next(error)
    }
});


routes.patch('/:id',validatingToken, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await orderProduct.updateProdcutsOrder(
            req.body
        )
        res.json({
            data: { result },
            message: 'products in order are updated successfully'
        })
    } catch (error) {
        next(error)
    }
});


routes.delete('/:id',validatingToken, async (req: Request,res: Response,next: NextFunction
) => {
    try {
        const result = await orderProduct.deletePRoductsOrder(
            req.params.id as unknown as number
        )
        res.json({
            data: { ...result },
            message: 'products in order are deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}
);


export default routes;
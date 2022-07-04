import { Router ,Request, Response, NextFunction } from "express";
import OrderProductModel    from "../../models/orderproducts";

const orderProduct = new OrderProductModel;

const routes = Router();


//create endpoint
routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
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


export default routes;
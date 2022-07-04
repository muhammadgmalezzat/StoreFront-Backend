import { Router ,Request,Response , NextFunction} from "express";
import OrderModel from "../../models/order";

const routes = Router();
const ordermodel = new OrderModel;

//create endpoint

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const result = await ordermodel.createOrder(req.body);
        res.json({
            message: `order created successfully `,
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
        const orders = await ordermodel.getAllOrders()
        res.json({
            data: { orders },
            message: 'All order were retrieved successfully'
        })
    } catch (error) {
        next(error)
    }
});


routes.get('/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await ordermodel.getOneOrder(
            req.query.id as unknown as number
        )
        res.json({
            data: { order },
            meesage: 'order retrieved successfully '
        })
    } catch (error) {
        next(error)
    }
}
); 


routes.patch('/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await ordermodel.updateOneOrder(req.body)
        res.json({
            data: { ...order },
            message: 'order updated successfully'
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
        const order = await ordermodel.deleteOneOrder(
            req.query.id as unknown as number
        )
        res.json({
            data: { ...order },
            message: 'order is deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}); 


export default routes;
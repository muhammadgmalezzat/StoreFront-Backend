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




export default routes;
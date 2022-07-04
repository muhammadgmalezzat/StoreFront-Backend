import { Router ,Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

const userModel = new UserModel();
const routes = Router();


//create endpoint

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const result = await userModel.createUser(req.body);
        res.json({
            message: `user created successfully `,
            data: { result }
        })
        res.json(result);
    } catch (error) {
        next(error);
    }
} );

//get all users

routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userModel.getAllUsers()
        res.json({
            data: { result },
            message: 'All Users were retrieved successfully'
        })
    } catch (error) {
        next(error)
    }
});

//get one 
routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userModel.getOneUser(req.query.id as unknown as number)
        res.json({
            data: { result },
            meesage: 'user retrieved successfully '
        })
    } catch (error) {
        next(error)
    }
});

//update one
routes.patch('/:id', async (req: Request,res: Response,next: NextFunction) => {
    try {
        const user = await userModel.updateOneUser(req.body)
        res.json({
            data: { user },
            message: 'user updated successfully'
        })
    } catch (error) {
        next(error)
    }
});

//delete one
routes.delete('/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.deleteOneUser(
            req.query.id as unknown as number
        )
        res.json({
            data: { ...user },
            message: 'user is deleted successfully'
        })
    } catch (error) {
        next(error)
    }
});


export default routes;
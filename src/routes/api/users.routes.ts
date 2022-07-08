import { Router ,Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";
import config from '../../config'
import jwt from "jsonwebtoken"
import validatingToken from "../../middlewares/authinticate"



const userModel = new UserModel();
const routes = Router();


//create endpoint

routes.post('/',validatingToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const result = await userModel.createUser(req.body);
        res.json({
            message: `user created successfully `,
            data: { ...result }
        })
        res.json(result);
    } catch (error) {
        next(error);
    }
} );

//get all users

routes.get('/',validatingToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userModel.getAllUsers()
        res.json({
            data: { ...result },
            message: 'All Users were retrieved successfully'
        })
    } catch (error) {
        next(error)
    }
});

//get one 
routes.get('/:id',validatingToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userModel.getOneUser(req.params.id as unknown as number)
        res.json({
            data: { ...result },
            meesage: 'user retrieved successfully '
        })
    } catch (error) {
        next(error)
    }
});

//update one
routes.patch('/:id',validatingToken, async (req: Request,res: Response,next: NextFunction) => {
    try {
        const result = await userModel.updateOneUser(req.body)
        res.json({
            data: { ...result },
            message: 'user updated successfully'
        })
    } catch (error) {
        next(error)
    }
});

//delete one
routes.delete('/:id',validatingToken, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await userModel.deleteOneUser(
            req.params.id as unknown as number
        )
        res.json({
            data: { ...result },
            message: 'user is deleted successfully'
        })
    } catch (error) {
        next(error)
    }
});

//authentication
routes.post(`/authenticate`,async (req: Request,res: Response,next: NextFunction) => {
    try {
        const { user_name, password } = req.body;
        const user = await userModel.outhentication(user_name, password);
        const token = jwt.sign({ user }, config.token as string);
    if (!user) {
        return res.status(401).json({
            status: "error",
        message: 'user name and password not match'
        })
    }
    res.json({
        data: { ...user, token },
        status: "sucess",
        message:'user is authenticated successfully and the token is also provided '
    })
    } catch (error) {
    next(error)
    }
} );


export default routes;
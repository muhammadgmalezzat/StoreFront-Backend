import { Request, Response, NextFunction } from "express";
import UserModel    from "../models/user";


const userModel = new UserModel();
export const create = async (req :Request, res:Response ,next:NextFunction) => {
    try {
        
        const result = await userModel.createUser(req.body);
        //console.log(req.body.user_name);
        res.json({
            message: `user created successfully `,
            data:{result}
        })
        res.json(result);
    } catch (error) {
        next(error);
    }
}
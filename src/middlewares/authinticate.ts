import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
//import error from '../interfaces/error_interface'
const handleUnauthorizedError = (next: NextFunction) => {
    const error: Error = new Error('Login Error: Please try again');
    next(error);
};


const validatingToken =  (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        //get authheader
        const authHeader = req.get('Authorization')
        console.log(authHeader)
        // check if token is valid before sending request to server 
        if (authHeader)
        {
            //get value of token
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
             //check if token is bearer token or not
            if (token && bearer === 'bearer')
            {
                //verify token
                const decode = jwt.verify(token, config.token as unknown as string);
                if (decode)
                {
                    //next ()
                    next();
                }
                else
                {
                    //failed to authenticate token
                    handleUnauthorizedError(next);
                }
            }
            else
            {
                    //if not 
                    handleUnauthorizedError(next);
            }
        }
        else {
            //if token is not valid 
            handleUnauthorizedError(next);
        }
    }
    catch (error)
    {
        handleUnauthorizedError(next);
    }
}


export default validatingToken;
import { Response, Request} from 'express';
import Error from '../interfaces/error_interface';

const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    
) => {
    const status = error.status || 500;
    const message = error.message || 'Whoops!!🙃  something went wrong';
    res.status(status).json({ status, message });
};
export default errorMiddleware;

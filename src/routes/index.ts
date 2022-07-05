import { Router } from "express";
import usersRoutes from "./api/users.routes";
import productsRoutes from "./api/products.routes";
import ordersRoutes from "./api/orders.routes";
import orderproducts from "./api/orderproducts";
const routes = Router();

routes.use('/users', usersRoutes);
// product
routes.use('/products', productsRoutes);
//orders
routes.use('/orders', ordersRoutes); 
//order products
routes.use('/orderproducts', orderproducts);
//authentication
routes.post(`/authenticate`, usersRoutes);
export default routes;
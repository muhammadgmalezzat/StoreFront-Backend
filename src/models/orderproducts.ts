import database from '../database'

export type order_products = {
    order_id: string;
    product_id: string;
    quantity: number;
};

class OrderProductModel {
    //creat product methode 
    async createorderProduct(productorder: order_products): Promise<order_products>
    {
        try {
            //open connection to database
            const connection = await database.connect();
            const sql = `INSERT INTO order_products (order_id, product_id, quantity) values ($1, $2, $3) RETURNING *;`;
            //run query
            const result = await connection.query(sql, [
                productorder.order_id,
                productorder.product_id,
                productorder.quantity
            ]);
            const createproductsorder = result.rows[0];
            //release connection
            connection.release();
            //return result
            return createproductsorder;
        } catch (error) {
            throw new Error(`unable to create order with id = (${productorder.order_id}): ${(error as Error).message}`);
        }
        
    }

    
}
export default OrderProductModel;
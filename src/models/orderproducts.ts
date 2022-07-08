import database from '../database'

export type order_products = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

class OrderProductModel {
    //creat product methode 
    async createorderProduct(productorder: order_products): Promise<order_products>
    {
        try {
            //open connection to database
            const connection = await database.connect();
            const sql = `INSERT INTO order_products (id,order_id, product_id, quantity) values ($1, $2, $3,$4) RETURNING *;`;
            //run query
            const result = await connection.query(sql, [
                productorder.id,
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



  //get all orders
    async getAllProducts_orders(): Promise<order_products[]> {
        try {
        //open connection to database
        const connection = await database.connect()
        const sql = `SELECT * FROM order_products`
        const result = await connection.query(sql)
        connection.release()
        return result.rows
    } catch (error) {
        throw new Error(
        `unable to get all order or products from the database`
        )
    }
    }


  //get one order
    async getOneProducts_orders(id: number): Promise<order_products> {
        try {
        //open connection to database
        const connection = await database.connect()
        const sql = `SELECT * FROM order_products WHERE id=$1  `
        const result = await connection.query(sql, [id])
        connection.release()
        return result.rows[0]
        } catch (error) {
        throw new Error(
        `unable to get the  products order from the database because ${
            (error as Error).message
        }`
        )
    }
    }


    //update one order
    async updateProdcutsOrder(product_order: order_products): Promise<order_products> {
        try {
        //open connection to database
        const connection = await database.connect()
        const sql = `UPDATE order_products set ( order_id, product_id,  quantity) = 
        ($1,$2,$3) WHERE id=$4  RETURNING *`
        const result = await connection.query(sql , [
        product_order.order_id,
        product_order.product_id,
        product_order.quantity,
        product_order.id
        ])
        connection.release()
        return result.rows[0]
        } catch (error) {
        throw new Error(
        `unable to update the products order from the database because ${
            (error as Error).message
        }`
        )
        }
    }
    //delete one order
    async deletePRoductsOrder(
    id: number,
    ): Promise<order_products> {
        try {
        //open connection to database
        const connection = await database.connect()
        const sql = `DELETE FROM order_products WHERE id=$1 RETURNING *`
        const result = await connection.query(sql, [ id])
        connection.release()
        return result.rows[0]
    } catch (error) {
        throw new Error(
        `Can not delete the products order baeause : ${
            (error as Error).message
        }`
        )
    }
}



}
export default OrderProductModel;
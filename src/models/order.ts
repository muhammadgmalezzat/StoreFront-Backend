import database from '../database'

//here order type 
export type Order = {
    id?: number;
    user_id: number;
};

//here order methodes

class OrderModel {

    //create new order
    async createOrder(order: Order): Promise <Order> 
    {
        try { 
            //open connection to database
            const connection = await database.connect();
            const sql = `INSERT INTO orders (id ,user_id) VALUES ($1,$2) RETURNING *;`;
            //run query
            const result = await connection.query(sql, [
                order.id,
                order.user_id,
            ]);
            const createorder= result.rows[0];
            //release connection
            connection.release();
            //return created user
            return createorder;
        } catch (error) {
            throw new Error(`unable to create order `);
        }
    }




    //get all orders
    async getAllOrders(): Promise<Order[]> {
    try {
        const connection = await database.connect()
      const sql = `SELECT * FROM orders`
        const result = await connection.query(sql)
        connection.release()
        return result.rows
    } catch (error) {
        throw new Error(`unable to get all orders from the database`)
    }
    }


    //get one order
    async getOneOrder(id: number): Promise<Order> {
    try {
        const connection = await database.connect()
        const sql = `SELECT user_id, id FROM orders  WHERE id=($1)`
        const result = await connection.query(sql, [id])
        connection.release()
        return result.rows[0]
    } catch (error) {
        throw new Error(
        `unable to get the  order from the database because ${
            (error as Error).message
        }`
        )
    }
    }
    //update one order
    async updateOneOrder(order: Order): Promise<Order> {
    try {
        const connection = await database.connect()
        const sql = `UPDATE orders set user_id = $1 WHERE id=$2  RETURNING *`
        const result = await connection.query(sql , [
            order.user_id,
            order.id
        ])
        connection.release()
        return result.rows[0]
        } catch (error) {
        throw new Error(`unable to update the order from the database because ${(error as Error).message}`)}
    }


    //delete one order
    async deleteOneOrder(id: number): Promise<Order> {
    try {
        const connection = await database.connect()
      const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`
        const result = await connection.query(sql, [id])
        connection.release()
        return result.rows[0]
        } catch (error) {
        throw new Error(
            `Can not delete the order  : ${
            (error as Error).message
        }`
        )
    }}
    

}
export default OrderModel;
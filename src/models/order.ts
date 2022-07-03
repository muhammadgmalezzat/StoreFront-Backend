import database from '../database'

//here order type 
export type Order = {
    id?: number;
    user_id: number;
};

//here user methodes

class OrderModel {
    //create new order
    async createUser(order: Order): Promise <Order> 
    {
        try { 
            //open connection to database
            const connection = await database.connect();
            const sql = `INSERT INTO orders (user_id) VALUES ($1) RETURNING *;`;
            //run query
            const result = await connection.query(sql, [
                order.user_id,
            ]);
            //release connection
            connection.release();
            //return created user
            return result.rows[0];
        } catch (error) {
            throw new Error(`unable to create order `);
        }
    }
}
export default OrderModel;
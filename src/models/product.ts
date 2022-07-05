import database from '../database'

// create type of product
export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;
};

//create product methodes

class ProductModel {

    //creat product methode 
    async createProduct(product: Product): Promise<Product>
    {
        try {
            //open connection to database
            const connection = await database.connect();
            const sql = `INSERT INTO products (id, name, price, category) values ($1, $2, $3 ,$4) RETURNING *;`;
            //run query
            const result = await connection.query(sql, [
                product.id,
                product.name,
                product.price,
                product.category
            ]);
            const createproducts = result.rows[0];
            //release connection
            connection.release();
            //return result
            return createproducts;
        } catch (error) {
            throw new Error(`unable to create  (${product.name}): ${(error as Error).message}`);
        }
        
    }

    //show all product

    async getAllProducts(): Promise<Product[]> {
    try {
        const connection = await database.connect()
      const sql = `SELECT * FROM products`
        const result = await connection.query(sql)
        connection.release()
        return result.rows
    } catch (error) {
        throw new Error(`unable to get all products from the database`)
    }
    }


    //get one 
    async getOneProduct(id: number): Promise<Product> {
    try {
        const connection = await database.connect()
        const sql = `SELECT  id, name, price ,category FROM products WHERE id=$1 `
        const result = await connection.query(sql, [id])
        connection.release()
        return result.rows[0]
    } catch (error) {
        throw new Error(
        `unable to get the  product from the database because ${(error as Error).message}`)
        }
    }


    //update one product
    async updateOneProduct(product: Product): Promise<Product> {
    try {
        const connection = await database.connect()
        const sql = `UPDATE products set (name, price , category) = ($1,$2 ,$3) WHERE id=$4 RETURNING *`
        const result = await connection.query(sql , [
        product.name,
        product.price,
        product.category,
        product.id
        ])
        connection.release()
        return result.rows[0];
        } catch (error) {
        throw new Error(
        `unable to update the product from the database because ${(error as Error).message}`
        )}
    }


    //delete  product
    async deleteOneProduct(id: number): Promise<Product> {
    try {
        const connection = await database.connect()
        const sql = `DELETE FROM products WHERE id=($1) RETURNING id, name, price ,category `
        const result = await connection.query(sql, [id])
        connection.release()
        return result.rows[0];
        } catch (error) {
        throw new Error(
        `Can not delete the product baeause : ${(error as Error).message}`)}
    }



}

export default ProductModel;
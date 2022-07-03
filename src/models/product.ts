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
            const sql = `INSERT INTO products (name, price, category) values ($1, $2, $3) RETURNING *;`;
            //run query
            const result = await connection.query(sql, [
                product.name,
                product.price,
                product.category
            ]);
            //release connection
            connection.release();
            //return result
            return result.rows[0];
        } catch (error) {
            throw new Error(`unable to create  (${product.name}): ${(error as Error).message}`);
        }
        
    }
}

export default ProductModel;
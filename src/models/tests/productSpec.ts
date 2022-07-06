import database from '../../database' 
import ProductModel from '../product'


type Product = {
    id?: number;
    name: string;
    price: string;
    category?: string;
};

const productModel = new ProductModel();



describe("Product Model tests", () => {
    describe("Test for existing  methods in Product Model", () => {
        //getAllProducts
        it("should have an getAllProducts method", () => {
            expect(productModel.getAllProducts).toBeDefined();
        });
        //getOneProduct
        it('should have a getOneProduct method', () => {
            expect(productModel.getOneProduct).toBeDefined();
        });
        //createProduct
        it('should have a createProduct method', () => {
            expect(productModel.createProduct).toBeDefined();
        });
        //updateOneProduct
        it('should have a updateOneProduct method', () => {
            expect(productModel.updateOneProduct).toBeDefined();
        });
        //deleteOneProduct
        it('should have a deleteOneProduct method', () => {
            expect(productModel.deleteOneProduct).toBeDefined();
        });
    });

    describe('Testing Logic of Product Model ', () => {
        const product = {
            id: 55,
            name: 'testproduct',
            price: "1000.00",
            category: 'category',
        } as Product;
        //beforeAll
        beforeAll(async () => {
            const createdProduct = await productModel.createProduct(product);
            product.id = createdProduct.id;
        });
        //afterAll
        afterAll(async () => {
            const connection = await database.connect();
            const sql = 'DELETE FROM products;';
            await connection.query(sql);
            connection.release();
        });
        //createProduct
        it('createProduct method should return a New product', async () => {
            const createdProduct = await productModel.createProduct({
                id: 56,
                name: 'testproduct',
                price : "5.00",
                category: 'category',
            } as Product);
            expect(createdProduct).toEqual({
                id: createdProduct.id,
                name: 'testproduct',
                price: "5.00",
                category: 'category',
            } as Product);
        });

        it('getAllProducts method should return All Products in DataBase', async () => {
            const Products = await productModel.getAllProducts();
            expect(Products.length).toBe(2);
        });

        it('getOneProduct method should return test Product by ID', async () => {
            const returnedProduct = await productModel.getOneProduct(product.id as number);

            expect(returnedProduct.id).toBe(product.id);
            expect(returnedProduct.name).toBe(product.name);
            expect(returnedProduct.price).toBe(product.price);
            expect(returnedProduct.category).toBe(product.category);
        });

        it('updateOneProduct method should return a product after product has been updated ', async () => {
            const updatedproduct = await productModel.updateOneProduct({
                ...product,
                name: 'testproduct Updated',
                price: "3000.00",
                category: 'category3',
            });
            expect(updatedproduct.id).toBe(product.id);
            expect(updatedproduct.name).toBe('testproduct Updated');
            expect(updatedproduct.price).toBe("3000.00");
            expect(updatedproduct.category).toBe('category3');
        });

        it('deleteOneProduct method should delete product from DataBase', async () => {
            const deletedproduct = await productModel.deleteOneProduct(product.id as number);
            expect(deletedproduct.id).toBe(product.id);
        });
    });
});

// import supertest from 'supertest'
// import app from '../../index'
// import database from '../../database'
// import ProductModel from '../../models/product'
// import UserModel from '../../models/user'

// type Product = {
//     id?: number;
//     name: string;
//     price: string;
//     category?: string;
// };
// type User = {
//     id?: number ;
//     user_name: string;
//     first_name: string;
//     last_name: string;
//     password: string;
// };


// const productModel = new ProductModel()
// const userModel = new UserModel()
// const request = supertest(app)
// let token = '';

// describe('testing User API Endpoints', () => {
//     const user = {
//         id: 5,
//         user_name: 'testUser',
//         first_name: 'Test',
//         last_name: 'User',
//         password: 'test123',
//     } as User;

//     const product = {
//         id: 1,
//         name: 'lap',
//         price: '5',
//         category: 'elctronics',
//     } as Product

//     beforeAll(async () => {
//         const createdUser = await userModel.createUser(user);
//         user.id = createdUser.id;
//         const creatProduct = await productModel.createProduct(product)
//         product.id = creatProduct.id
//     });

//     afterAll(async () => {
//         // clean database
//         const connection = await database.connect();
//         const sql = 'DELETE FROM users;';
//         await connection.query(sql);
//         const sql2 = `DELETE FROM products`
//         await connection.query(sql2)
//         connection.release();
//     });

//     describe('Testing Authentication method API 🟢', () => {
//         it('should be able to authenticate to get token', async () => {
//             const res = await request
//                 .post('/api/users/authenticate')
//                 .set('Content-type', 'application/json')
//                 .send({
//                     user_name: 'testUser',
//                     password: 'test123',
//                 });
//             expect(res.status).toBe(200);
//             const { id, user_name, token: userToken } = res.body.data;
//             expect(id).toBe(user.id);
//             expect(user_name).toBe('testUser');
//             token = userToken;
//         });

//         it('should be failed to authenticate with wrong user_name', async () => {
//             const res = await request
//                 .post('/api/users/authenticate')
//                 .set('Content-type', 'application/json')
//                 .send({
//                     user_name: 'falsee',
//                     password: 'test123',
//                 });
//             expect(res.status).toBe(401);
//         });


        
//     });

//     describe('Test CRUD Operations methods for 🟢Product model🟢', () => {
//         it('Create User new product', async () => {
//             const res = await request
//                 .post('/api/products/')
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({
//                     id: 2,
//                     name: 'lap',
//                     price: '5',
//                     category: 'elctronics',
//                 } as Product)
//             expect(res.status).toBe(200)
//             const { id, name, price, category } = res.body.data
//             expect(id).toBe(2)
//             expect(name).toBe('lap')
//             expect(price).toBe('5')
//             expect(category).toBe('elctronics')
//         });

//         it('should get list of products', async () => {
//             const res = await request
//                 .get('/api/products/')
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toBe(200)
//             expect(Object.keys(res.body.data).length).toBe(2)
//         });

//         it('should get one of product', async () => {
//             const res = await request
//                 .get(`/api/products/${product.id}/`)
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//             const { name, price, category } = res.body.data
//             expect(name).toBe('lap')
//             expect(price).toBe('5')
//             expect(category).toBe('elctronics')
//         })

//         it('should update one of product', async () => {
//             const res = await request
//                 .patch(`/api/products/${product.id}/`)
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({
//                     ...product,
//                     id:1,
//                     name: 'phone ',
//                     price: '7',
//                     category: 'elctronics'
//                 })
//             expect(res.status).toBe(200)
//             const { id, name, price, category } = res.body.data
//             expect(id).toBe(product.id)
//             expect(name).toBe('phone ')
//             expect(price).toBe('7')
//             expect(category).toBe('elctronics')
//         })

//         it('should delete one of products', async () => {
//             const res = await request
//                 .delete(`/api/products/${product.id}/`)
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toBe(200)
//             const { id, name, price, category } = res.body.data
//             expect(id).toBe(product.id)
//             expect(name).toBe('phone ')
//             expect(price).toBe('7')
//             expect(category).toBe('elctronics')
//         });
    
//     });
    
// });


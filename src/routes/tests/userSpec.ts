// import supertest from 'supertest'
// import database from '../../database'
// import UserModel from '../../models/user'
// import app from '../../index'

// type User = {
//     id?: number ;
//     user_name: string;
//     first_name: string;
//     last_name: string;
//     password: string;
// };

// const userModel = new UserModel();
// const request = supertest(app);
// let token = '';

// //cheak if user is already authenticated

// describe('testing User API Endpoints', () => {
//     const user = {
//         id: 5,
//         user_name: 'testUser',
//         first_name: 'Test',
//         last_name: 'User',
//         password: 'test123',
//     } as User;

//     beforeAll(async () => {
//         const createdUser = await userModel.createUser(user);
//         user.id = createdUser.id;
//     });

//     afterAll(async () => {
//         // clean database
//         const connection = await database.connect();
//         const sql = 'DELETE FROM users';
//         await connection.query(sql);
//         connection.release();
//     });

//     describe('Testing Authentication method API', () => {
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

        
    
//     describe('Testing CRUD Operation API methods for USERMODEL', () => {
//         it('Create new User ', async () => {
//             const res = await request
//                 .post('/api/users/')
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({
//                     id:3,
//                     user_name: 'test1',
//                     first_name: 'test1',
//                     last_name: 'test1',
//                     password: 'test1',
//                 } as User)
//             expect(res.status).toBe(200)
//             const {  id, user_name, first_name, last_name } = res.body.data
//             expect(id).toBe(3)
//             expect(user_name).toBe('test1')
//             expect(first_name).toBe('test1')
//             expect(last_name).toBe('test1')
//         })

//         // all perfect

//         it('should get list of users', async () => {
//             const res = await request
//                 .get('/api/users/')
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toBe(200)
//             expect(Object.keys(res.body.data).length).toBe(2)
//         })

//         it('should get one of users', async () => {
//             const res = await request
//                 .get(`/api/users/${user.id}`)
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//             const { id, user_name, first_name, last_name } =
//                 res.body.data
//             expect(id).toBe(user.id)
//             expect(user_name).toBe('testUser')
//             expect(first_name).toBe('Test')
//             expect(last_name).toBe('User')
//         })

//         it('should update one of users', async () => {
//             const res = await request
//                 .patch(`/api/users/${user.id}`)
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({
                    
//                     id:5,
//                     user_name: 'test2',
//                     first_name: 'test2',
//                     last_name: 'test2'
//                 })
//             expect(res.status).toBe(200)
//             const { id, user_name, first_name, last_name } =
//                 res.body.data
//             expect(id).toBe(user.id)
//             expect(user_name).toBe('test2')
//             expect(first_name).toBe('test2')
//             expect(last_name).toBe('test2')
//         })

//         it('should delete one of users', async () => {
//             const res = await request
//                 .delete(`/api/users/${user.id}`)
//                 .set('Content-type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//             expect(res.status).toBe(200)
//             expect(res.body.data.id).toBe(user.id)
//             expect(res.body.data.user_name).toBe('test2')
//         })
//     })
// });

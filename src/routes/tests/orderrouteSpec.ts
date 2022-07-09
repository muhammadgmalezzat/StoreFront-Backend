import supertest from 'supertest'
import app from '../../index'
import database from '../../database'
import OrderModel from '../../models/order'
import UserModel from '../../models/user'


type Order = {
    id?: number;
    user_id: number;
};
type User = {
    id?: number ;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};

const orderModel = new OrderModel()
const userModel = new UserModel()

const request = supertest(app)
let token = ''

describe('Testing the logic of the Orders routes', () => {
    const user = {
        id: 1,
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
    } as User

    const order = {
        id: 1,
        user_id: 1,
    } as Order

    beforeAll(async () => {
        const createUser = await userModel.createUser(user)
        user.id = createUser.id
        const creatOrder = await orderModel.createOrder(order)
        order.id = creatOrder.id
    })

    afterAll(async () => {
        const connection = await database.connect()
        const sql1 = `DELETE FROM orders`
        await connection.query(sql1)
        const sql = `DELETE FROM users`
        await connection.query(sql)
        connection.release()
    })

    describe('Testing Authentication method API', () => {
        it('should be able to authenticate to get token', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    user_name: 'testUser',
                    password: 'test123',
                });
            expect(res.status).toBe(200);
            const { id, user_name, token: userToken } = res.body.data;
            expect(id).toBe(user.id);
            expect(user_name).toBe('testUser');
            token = userToken;
        });

        it('should be failed to authenticate with wrong user_name', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    user_name: 'falsee',
                    password: 'test123',
                });
            expect(res.status).toBe(401);
        });
    });

    describe('Testing CRUD Operation methods for orders model', () => {
        it('Create User new order', async () => {
            const res = await request
                .post('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    user_id:1,
                    id: 2
                } as Order)
            expect(res.status).toBe(200)
            const {id,user_id} = res.body.data
            expect(user_id).toBe(user.id)
            expect(id).toBe(2)
        })

        it('Create new User ', async () => {
            const res = await request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id:3,
                    user_name: 'test1',
                    first_name: 'test1',
                    last_name: 'test1',
                    password: 'test1',
                } as User)
            expect(res.status).toBe(200)
            const {  id, user_name, first_name, last_name } = res.body.data
            expect(id).toBe(3)
            expect(user_name).toBe('test1')
            expect(first_name).toBe('test1')
            expect(last_name).toBe('test1')
        })
        it('should get list of orders', async () => {
            const res = await request
                .get('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(Object.keys(res.body.data).length).toBe(2)
        })

        it('should get one of orders', async () => {
            const res = await request
                .get(`/api/orders/${order.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.body.data.id).toBe(order.id)
            expect(res.body.data.user_id).toBe(order.user_id)
        })

        it('should update one of order', async () => {
            const res = await request
                .patch(`/api/orders/${order.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...order,
                    id:1,
                    user_id: 3,
                })
            expect(res.status).toBe(200)
            const { id, user_id } = res.body.data
            expect(id).toBe(1)
            expect(user_id).toBe(3)
        })

        it('should delete one of orders', async () => {
            const res = await request
                .delete(`/api/orders/${order.id}/`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.id).toBe(order.id)
            expect(res.body.data.user_id).toBe(3)
        })
    })
});

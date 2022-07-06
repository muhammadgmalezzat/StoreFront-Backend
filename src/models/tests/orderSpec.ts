import database from '../../database' 
import OrderModel from '../order'
import UserModel from '../user'

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

const orderModel = new OrderModel();
const userModel = new UserModel();


describe("order Model tests 👽", () => {
    describe("Test for existing  methods in Product Model 👽", () => {
        //getAllOrders
        it("should have an getAllOrders method 👽", () => {
            expect(orderModel.getAllOrders).toBeDefined();
        });
        //getOneOrder
        it('should have a getOneOrder method 👽', () => {
            expect(orderModel.getOneOrder).toBeDefined();
        });
        //createorder
        it('should have a createOrder method 👽', () => {
            expect(orderModel.createOrder).toBeDefined();
        });
        //updateOneOrder
        it('should have a updateOneOrder method 👽', () => {
            expect(orderModel.updateOneOrder).toBeDefined();
        });
        //deleteOneOrder
        it('should have a deleteOneOrder method 👽', () => {
            expect(orderModel.deleteOneOrder).toBeDefined();
        });
    });
    //createUser
    describe('Testing Logic of Order  Model 👽', () => {
        const order =
            {
                id: 1,
                user_id: 1,
            } as Order;
        
        const user =
            {
                id: 1,
                user_name: 'testUser',
                first_name: 'Test',
                last_name: 'User',
                password: 'test123',
            } as User;


        //beforeAll
        beforeAll(async () => {
            const createdUser = await userModel.createUser(user)
            user.id = createdUser.id
            order.id = createdUser.id
            const createdOrder = await orderModel.createOrder(order)
            order.id = createdOrder.id
        });
        //afterAll
        afterAll(async () => {
            const connection = await database.connect()
            const sql = `DELETE FROM orders`
            await connection.query(sql)
            const sq1l = `DELETE FROM users`
            await connection.query(sq1l)
            connection.release()
        });
        //createUser

        it('getAllOrders method should return All Orders in DataBase 👽', async () => {
            const orders = await orderModel.getAllOrders();
            expect(orders.length).toBe(1);
        });

        it('getOneOrder method should return test order by ID 👽', async () => {
            const returnedorder = await orderModel.getOneOrder(order.id as number);

            expect(returnedorder.id).toBe(order.id);
            expect(returnedorder.user_id).toBe(order.user_id);
        });

        it('updateOneOrder method should return a order after order has been updated 👽', async () => {
            const updatedorder = await orderModel.updateOneOrder({
                ...order,
                id: 1,
                user_id: 1,
            });
            expect(updatedorder.id).toBe(order.id);
            expect(updatedorder.user_id).toBe(1);
        });

        it('deleteOneOrder method should delete order from DataBase👽', async () => {
            const deletedorder = await orderModel.deleteOneOrder(order.id as number);
            expect(deletedorder.id).toBe(order.id);
        });
    });
});

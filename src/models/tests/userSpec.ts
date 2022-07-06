import database from '../../database' 
import UserModel from '../user'


type User = {
    id?: number ;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};
const userModel = new UserModel();



describe("User Model tests", () => {
    describe("Test for existing  methods", () => {
        //getAllUsers
        it("should have an getAllUsers method", () => {
            expect(userModel.getAllUsers).toBeDefined();
        });
        //getOneUser
        it('should have a getOneUser method', () => {
            expect(userModel.getOneUser).toBeDefined();
        });
        //createUser
        it('should have a createUser method', () => {
            expect(userModel.createUser).toBeDefined();
        });
        //updateOneUser
        it('should have a updateOneUser method', () => {
            expect(userModel.updateOneUser).toBeDefined();
        });
        //deleteOneUser
        it('should have a deleteOneUser method', () => {
            expect(userModel.deleteOneUser).toBeDefined();
        });
        //outhentication
        it('should have an outhentication method', () => {
            expect(userModel.outhentication).toBeDefined();
        });
    });

    describe('Testing Logic of User Model ', () => {
        const user = {
            id: 55,
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123',
        } as User;
        //beforeAll
        beforeAll(async () => {
            const createdUser = await userModel.createUser(user);
            user.id = createdUser.id;
        });
        //afterAll
        afterAll(async () => {
            const connection = await database.connect();
            const sql = 'DELETE FROM users;';
            await connection.query(sql);
            connection.release();
        });
        //createUser
        it('createUser method should return a New User', async () => {
            const createdUser = await userModel.createUser({
                id: 65,
                user_name: 'test2User',
                first_name: 'Test',
                last_name: 'User',
                password: 'test123',
            } as User);
            expect(createdUser).toEqual({
                id: createdUser.id,
                user_name: 'test2User',
                first_name: 'Test',
                last_name: 'User',
            } as User);
        });

        it('getAllUsers method should return All users in DataBase', async () => {
            const users = await userModel.getAllUsers();
            expect(users.length).toBe(2);
        });

        it('getOneUser method should return test User by ID', async () => {
            const returnedUser = await userModel.getOneUser(user.id as number);
            expect(returnedUser.id).toBe(user.id);
            expect(returnedUser.user_name).toBe(user.user_name);
            expect(returnedUser.first_name).toBe(user.first_name);
            expect(returnedUser.last_name).toBe(user.last_name);
        });

        it('updateOneUser method should return a user after user has been updated ', async () => {
            const updatedUser = await userModel.updateOneUser({
                ...user,
                user_name: 'testUser Updated',
                first_name: 'mmm',
                last_name: 'yyy',
            });
            expect(updatedUser.id).toBe(user.id);
            expect(updatedUser.user_name).toBe('testUser Updated');
            expect(updatedUser.first_name).toBe('mmm');
            expect(updatedUser.last_name).toBe('yyy');
        });

        it('deleteOneUser method should delete user from DataBase', async () => {
            const deletedUser = await userModel.deleteOneUser(user.id as number);
            expect(deletedUser.id).toBe(user.id);
        });
    });
});

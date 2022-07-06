import UserModel from "../user";
import database from '../../database'

type User = {
    id?: number ;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};
const userModel = new UserModel();

describe("athentication model", () => {
    describe("check if  method is exists ", () => {
        it("athenticate user method ", () => {
            //outhentication model testing
            expect(userModel.outhentication).toBeDefined();
        });
    });

    describe('Test outhentication model Logic', () => {
        const user = {id :55 , user_name: 'testuser', first_name: 'test', last_name: 'user', password: 'test123'} as User ;
        //beforeAll
        beforeAll(async () => {
            const createdUser = await userModel.createUser(user);
            user.id = createdUser.id;
        });
        //afterAll
        afterAll(async () => {
            const connection = await database.connect();
            const sql = 'DELETE FROM users';
            await connection.query(sql);
            connection.release();
        });
        //return authenticatedUser testing 
        it('Authentication return authenticated user  ', async () => {
            const authenticatedUser = await userModel.outhentication(user.user_name, user.password as string);
            //expected user testing
            expect(authenticatedUser?.id).toBe(user.id);
            expect(authenticatedUser?.user_name).toBe(user.user_name);
            expect(authenticatedUser?.first_name).toBe(user.first_name);
            expect(authenticatedUser?.last_name).toBe(user.last_name);

        });
        //wrong password
        it('Authentication failed then  return null , password is wrong', async () => {
            const authenticatedUser = await userModel.outhentication(
                'mohamed',
                'f'
            );
            expect(authenticatedUser).toBe(null);
        });
    });
});
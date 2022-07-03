import database from '../database'

//here user type 
export type User = {
    id?: number ;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
};

//here user methodes

class UserModel{
    //create new user
    async createUser(user: User): Promise <User> 
    {
        try { 
            //open connection to database
            const connection = await database.connect();
            const sql = `INSERT INTO users (user_name, first_name, last_name, password) values ($1, $2, $3, $4) RETURNING *`;
            //run query
            const result = await connection.query(sql, [
                user.username,
                user.firstname,
                user.lastname,
                user.password
            ]);
            const createUser = result.rows[0];
            //release connection
            connection.release();
            //return created user
            return createUser;
        } catch (error) {
            throw new Error(`unable to create  (${user.username}): ${(error as Error).message}`);
        }
    }
}
export default UserModel;
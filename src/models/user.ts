import database from '../database'

//here user type 
export type User = {
    id?: number ;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};

//here user methodes

class UserModel {

    //create new user
    async createUser(user: User): Promise<User> {
        try {
            //open connection to database
            const connection = await database.connect();
            const sql = `INSERT INTO users (user_name, first_name, last_name, password) values ($1, $2, $3, $4) RETURNING *`;
            //run query
            const result = await connection.query(sql, [
                user.user_name,
                user.first_name,
                user.last_name,
                user.password
            ]);
            const createUser = result.rows[0];
            //release connection
            connection.release();
            //return created user
            return createUser;
        } catch (error) {
            throw new Error(`unable to create  (${user.user_name}): ${(error as Error).message}`);
        }
    }

    //show all users
    async getAllUsers(): Promise<User[]> {
        try {
            const connection = await database.connect()
            const sql = `SELECT  id, user_name, first_name, last_name FROM users`
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`unable to get all users from the database`)
        }
    }

    //one user
    async getOneUser(user_name: string): Promise<User> {
        try {
            const connection = await database.connect()
            const sql = `SELECT  user_name, first_name, last_name FROM users WHERE user_name =$1`
            const result = await connection.query(sql, [user_name])
            connection.release()
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to get the user from the database because ${(error as Error).message}`)
        }
    }


    
    //update user
    async updateOneUser(user: User): Promise<User> {
    try {
        const connection = await database.connect()
        const sql = `UPDATE users set ( user_name, first_name, last_name, password) = 
        ($1,$2,$3,$4) WHERE id=$5  RETURNING id, user_name, first_name, last_name`
        const result = await connection.query(sql , [
        user.user_name,
        user.first_name,
        user.last_name,
        user.password,
        user.id
        ])
        connection.release()
        return result.rows[0]
        } catch (error) {
        throw new Error(
            `unable to update user from the database because ${(error as Error).message}`)
        }
    }

    //delete user
    async deleteOneUser(id: number): Promise<User> {
    try {
        const connection = await database.connect()
        const sql = `DELETE FROM users WHERE id=$1 RETURNING id, user_name, first_name, last_name`
        const result = await connection.query(sql, [id])
        connection.release()
        return result.rows[0];
    } catch (error) {
        throw new Error(
            `Can not delte user baeause : ${(error as Error).message}`)
        }
    }


}
export default UserModel;
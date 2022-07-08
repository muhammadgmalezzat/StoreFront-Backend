import database from '../database'
import config from '../config'
import bcrypt from 'bcrypt'
import { response } from 'express';


// here is hashing password function
const hashingPassword = (password: string) => {
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
    
};
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
            const sql = `INSERT INTO users (id,user_name, first_name, last_name, password) values ($1, $2, $3, $4,$5) RETURNING id ,user_name,first_name, last_name`;
            //run query
            const result = await connection.query(sql, [
                user.id,
                user.user_name,
                user.first_name,
                user.last_name,
                hashingPassword(user.password),
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
    async getOneUser(id: number): Promise<User> {
        try {
            const connection = await database.connect()
            const sql = `SELECT  id,user_name, first_name, last_name FROM users WHERE id =($1)`
            const result = await connection.query(sql, [id])
            connection.release();
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
        const sql = `UPDATE users set (user_name, first_name, last_name, password) = 
        ($1,$2,$3,$4) WHERE id=$5  RETURNING id, user_name, first_name, last_name`
        const result = await connection.query(sql , [
        user.user_name,
        user.first_name,
        user.last_name,
        hashingPassword(user.password),
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

    //athentication methode
    async outhentication(user_name: string, password: string): Promise <User | null> {
        try {
            const connection = await database.connect();
            const sql = `SELECT password FROM users WHERE user_name =$1`;
            const result = await connection.query(sql, [user_name]);
            if (result.rows.length) {
                const { password: hashingPassword } = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashingPassword);
                if (isPasswordValid) {
                    const userInfo = await connection.query(`SELECT id, user_name,first_name,last_name FROM users WHERE user_name = ($1) `, [user_name]);
                    return userInfo.rows[0];
                }
                else {
                    connection.release();
                    response.send("outhentication failed");
                return null;
                }
            }else {
                connection.release();
                response.send("outhentication failed");
                return null;
                }
            

        } catch (error) {
        throw new Error(
            `unable to login : ${(error as Error).message}`)
        }
    }

}
export default UserModel;

//here user type 
export type User = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
};

//here user methodes

class UserModel{
    //create new user
    async createUser(user: User): Promise<User> 
    {
        try {
            
        } catch (error) {
            throw new Error(`unable to create  (${user.username}): ${(error as Error).message}`);
        }
    }
}

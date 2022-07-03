import dotenv from 'dotenv';

dotenv.config();


const {
    PORT,
    POSTGRES_HOST,
    NODE_ENV,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

export default {
    port: PORT ,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: NODE_ENV==='dev'?POSTGRES_DB : POSTGRES_TEST_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD
}
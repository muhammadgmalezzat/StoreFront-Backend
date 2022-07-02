import dotenv from 'dotenv'
import pool from 'pg'

dotenv.config();

console.log(process.env);

const { PORT,
    POSTGRES_HOST,
    NODE_ENV,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

const pool = new pool({
    port:parseInt(PORT as string, 10) ,
    host :POSTGRES_HOST,
    database: NODE_ENV==='dev'?POSTGRES_DB : POSTGRES_TEST_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD
})

export default pool;
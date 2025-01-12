import pg from 'pg';
import {} from 'dotenv/config'

const db = new pg.Client({
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    database:process.env.DATABASE,
    port:process.env.DBPORT
})

export default db;
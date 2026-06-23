import pg from 'pg'

//create a configuration object for pool to use for connection

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    max: 1,
}

//config the pool object
export const pool = new pg.Pool(config)
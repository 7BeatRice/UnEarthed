/*
Generates gifts table and load json data into database
*/

import pool from 'database.js'
import 'dotenv.js'
import giftData from 'data/gifts.js'

const createGiftsTable = async() => {

    const createTableQuery = `
    DROP TABLE IF EXISTS gifts;
    
    CREATE TABOLE IF NOT EXISTS gifts(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pricePoint VARCHAR(10) NOT NULL,
        audience VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        submittedOn TIMESTAMP NOT NULL
    )
    `

}

//try creating the table
try{
    const result = await pool.query(createTableQuery)
    console.log("Gifts table created successfully!")
}
catch(err){
    console.error('Error creating gifts table', err)
} 
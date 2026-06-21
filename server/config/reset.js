/*
Generates gifts table and load json data into database
*/

import {pool} from './database.js'
import './dotenv.js'
import giftData from '../data/gifts.js'

//create empty table with colmns id, name, pricePoint, audience, image, description, subbmittedOn, submittedBy
const createGiftsTable = async() => {

    const createTableQuery = `
    DROP TABLE IF EXISTS gifts;
    
    CREATE TABLE IF NOT EXISTS gifts(
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

    //try creating the table
    try{
        const result = await pool.query(createTableQuery)
        console.log("Gifts table created successfully!")
    }
    catch(err){
        console.error('Error creating gifts table', err)
    } 

}




const seedGiftsTable = async() =>{
    await createGiftsTable()
    giftData.forEach((gift) =>
    {
        //the text right after gifts, tells sql to insert these place hoders into columns
        //The reason we use place holders rather than the avtual value right away is to prevent sql injection
        //if one of the values for the data is a command, sql would run the dangerous command rather than relizing its a value
      
        const insertQuery = {
            text: 'INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            gift.name,
            gift.pricePoint,
            gift.audience,
            gift.image,
            gift.description,
            gift.submittedBy,
            gift.submittedOn
        ]

        //in potgresql, query maps the values to their corresponsing place holder
        pool.query(insertQuery, values, (err, res) => {
            if (err){
                console.error('Errro inserting gifts', err)
                return
            }
            console.log(`${gift.pricePoint} added successfully`)
        })
    }
    )
}
seedGiftsTable()
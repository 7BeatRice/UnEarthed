import {pool} from '../config/database.js'
const getGifts = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
        res.status(200).json(result.rows)
    }
    catch(error){
        res.status(409).json({error: error.message})

    }
}

const getGiftsById = async (req, res) => {
    try{
        const selectQuery = 'SELECT name, pricePoint, audience, image, description,submittedBy, submittedOn FROM gifts WHERE id=$1'
           const giftId = req.params.giftId
            const result = await pool.query(selectQuery, [giftId])
            res.status(200).json(result.rows[0] )
            }
    catch (error){
        res.status(400).json({error: error.message})

    }
  
}

const createGift = async(req, res) => {
    try{
        const {name, pricepoint, audience, image, description, submittedby, submittedon} = req.body()
        insertQuery = "INSERT INTO gifts  (name, pricepoint, audience, image, description, submittedby, submittedon) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
        const result = pool.query(insertQuery, [name, pricepoint, audience, image, description, submittedby, submittedon])
        res.status(201).json(result.rows[0])
    }
    catch(error){
        res.status(409).json({error: error.message})
    }
}

const updateGift = async(req, res) => {
    try{
        const giftId = parseInt(req.params.id)
        const {name, pricepoint, audience, image, description, submittedby, submittedon} = req.body()
        updateQuery = 'UPDATE gifts SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon = $7 WHERE id = $8'
        const result = pool.query(updateQuery, [name, pricepoint, audience, image, description, submittedby, submittedon, giftId])
        res.status(200).json(result.rows[0])

    }
    catch(error){
        res.status(401).json({error: error.message})
    }
}

const deleteGift = async(req, res) => {
    try{
        const giftId = pareseInt(req.params.id)
        const deleteQuery = 'DELETE FROM gifts WHERE id = $1'
        const reponse = pool.query(deleteQuery, [giftId])
        res.status(201).json(reponse.rows[0])

    }
    catch(error){
        res.status(401).json({error: error.message})

    }
}

export default {getGifts, getGiftsById, createGift, updateGift, deleteGift}
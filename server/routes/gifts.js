import express from 'express'

//fileURLToPath method from the url module
import giftController from '../controllers/gifts.js'


const router = express.Router()
/*router.get('/', (req, res) => {
    res.status(200).json(giftData)
})*/

router.get('/', giftController.getGifts)
router.get('/:giftId', giftController.getGiftsById)

export default router
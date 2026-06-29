import express from 'express'
import './config/dotenv.js'
import giftsRouter from './routes/gifts.js'
import cors from 'cors'

const app = express()


//add cors middleware intercepting request to add http header which tells broswer what to do with requests
app.use(cors())
//express.json() middleware makes json data available in req.body
app.use(express.json())
app.use('/gifts', giftsRouter)

/*Route for the root url
Route - specific url in webpage paired with a http method to perform an action*/
app.get('/',(req, res) => 
{
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
}
)


/*Start a server at a specified port and listen for requests from external client*/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server listening on http://localhost:',PORT)
})


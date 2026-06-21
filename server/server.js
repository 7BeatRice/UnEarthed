import express from 'express'
import './config/dotenv.js'
import giftsRouter from './routes/gifts.js'
const app = express()
/*middleware function that  serve static files from various client directory
essentially allowing an external client to read the data from my local client*/
app.use('./public', express.static('../dist'))
app.use('/scripts', express.static('../dist/scripts'))

/*Route for the root url
Route - specific url in webpage paired with a http method to perform an action*/
app.get('/',(req, res) => 
{
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
}
)

app.use('/gifts', giftsRouter)
/*Start a server at a specified port and listen for requests from external client*/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server listening on http://localhost:',PORT)
})


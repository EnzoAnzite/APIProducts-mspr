import express from 'express'
import {connect} from 'mongoose'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.ts'
import bodyParser from 'body-parser';

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dataBaseUrl = process.env.DATABASE_URL || ''

app.use('/api', productRoutes)
app.get('/', (req, res) => {
    res.send('API product service is running')
})

connect(dataBaseUrl).then(() => {
    console.log('Connected to MongoDB')
    app.listen(3001, () => {
        console.log(`App listening on port 3001`)
    })
}).catch((err) => {
    console.error(err)
})

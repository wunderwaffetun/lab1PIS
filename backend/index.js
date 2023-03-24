import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'fs'
import { db } from './models/index.js'
import { initialData } from './models/initialData.js'
import { handleRouter } from './router.js'




const authData = JSON.parse(fs.readFileSync('./config/config.json'))
const app = express()
const port = authData.port

app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(handleRouter)

//Принудительное обновление Бд
db.sequelize.sync({force: true})
    .then(() => {
        initialData()
    })


app.listen(port, () => {
    console.log('started')
})
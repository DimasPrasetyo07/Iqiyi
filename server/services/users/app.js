const mongoConnection = require ('./config/mongo-connection')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4001
const routes = require('./routers/index')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)





mongoConnection.connect()
    .then((data) => {
        console.log('DB connected to the server')
        app.listen(PORT, () => {
            console.log(`App listening on PORT ${PORT} `)
        })
    })

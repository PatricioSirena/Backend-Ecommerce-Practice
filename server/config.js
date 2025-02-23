require('../db/dbConfig')
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 4001

        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, '../public')))
        this.app.use(cors())
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use('/api/products', require('../routes/products'))
        this.app.use('/api/users', require('../routes/users'))
        this.app.use('/api/categories', require('../routes/categories'))
    }

    listen(){
        this.app.listen(this.port ,() =>{
            console.log('server activo en puerto', this.port)
        })
    }
}

module.exports = Server
const mongoose =  require('mongoose')
const { mongodburl } = require('../secret')

const connectDB = async (options = {}) => {
    try {
        await mongoose.connect(mongodburl, options)
        console.log('mongodb connected')

        mongoose.connection.on('error', (error) => {
            console.error('DB Connection Error: ', error)
        })
    } catch (error) {
        console.error('Could not connected', error.toString())

    }
}

module.exports = connectDB
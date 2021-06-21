const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const vehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    modelYear: String,
    vehicleType: String,
    vin: String,
    plateNumber: String,
    insuranceExpiryDate: String,
    color: String,
    mileageInformation: [
        {
            lastUpdated: String,
            lastMileage: String,
            oilChangeStartInterval: Boolean,
            oilChangeInterval: String,
            _id: false
        }
    ],
    warrantyInfo: [
        {
            warrantyTitle: String,
            warrantyProvider: String,
            warrantyDetail: String,
            warrantyDate: String,
            _id: false
        }
    ]
})

vehicleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)

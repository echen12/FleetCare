require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const Vehicle = require('./models/vehicleInfo')

// let vehicles = [
//     {
//         "make": "TOYOTA",
//         "model": "Tacoma",
//         "modelYear": "2016",
//         "vehicleType": "Pickup",
//         "vin": "5TFDZ5BN3GX010438",
//         "plateNumber": "AB1234",
//         "insuranceExpiryDate": "2021-07-22",
//         "color": "white",
//         "mileageInformation": [
//             {
//                 "lastUpdated": "06/20/2021",
//                 "lastMileage": 0,
//                 "oilChangeStartInterval": false
//             },
//             {
//                 "lastUpdated": "06/20/2021",
//                 "lastMileage": "3000",
//                 "oilChangeStartInterval": false
//             },
//             {
//                 "lastUpdated": "06/20/2021",
//                 "lastMileage": "4500",
//                 "oilChangeStartInterval": false
//             },
//             {
//                 "lastUpdated": "06/20/2021",
//                 "lastMileage": "5000",
//                 "oilChangeStartInterval": true,
//                 "oilChangeInterval": "16000"
//             },
//             {
//                 "lastUpdated": "06/20/2021",
//                 "lastMileage": "7000",
//                 "oilChangeStartInterval": false
//             }
//         ],
//         "warrantyInfo": [
//             {
//                 "warrantyTitle": "fdfd",
//                 "warrantyProvider": "dfaf",
//                 "warrantyDetail": "fdfd",
//                 "warrantyDate": "06/20/2021"
//             },
//             {
//                 "warrantyTitle": "AC Compressor Clutch",
//                 "warrantyProvider": "Toyota",
//                 "warrantyDetail": "Replaced AC compressor under warranty, recharged system",
//                 "warrantyDate": "06/20/2021"
//             }
//         ],
//         "id": 1
//     },
//     {
//         "make": "GMC",
//         "model": "Sierra",
//         "modelYear": "2021",
//         "vehicleType": "Pickup",
//         "vin": "1GTU9CED4MZ361964",
//         "plateNumber": "ABC1234",
//         "insuranceExpiryDate": "2022-07-12",
//         "color": "white",
//         "mileageInformation": [
//             {
//                 "lastUpdated": "06/20/2021",
//                 "lastMileage": 0,
//                 "oilChangeStartInterval": false
//             },
//             {
//                 "lastUpdated": "06/20/2021",
//                 "lastMileage": "2353",
//                 "oilChangeStartInterval": false
//             }
//         ],
//         "warrantyInfo": [
//             {
//                 "warrantyTitle": "ABS Module",
//                 "warrantyProvider": "GM",
//                 "warrantyDetail": "replaced abs and abc module under warranty @ 4500km",
//                 "warrantyDate": "06/20/2021"
//             }
//         ],
//         "id": 2
//     }
// ]

// const url = `mongodb+srv://fleetcare-user:fleetcare1@cluster0.ltn6m.mongodb.net/vehicleInfo?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const vehicleSchema = new mongoose.Schema({
//     make: String,
//     model: String,
//     modelYear: String,
//     vehicleType: String,
//     vin: String,
//     plateNumber: String,
//     insuranceExpiryDate: String,
//     color: String,
//     mileageInformation: [
//         {
//             lastUpdated: String,
//             lastMileage: String,
//             oilChangeStartInterval: Boolean,
//             oilChangeInterval: String
//         }
//     ],
//     warrantyInfo: [
//         {
//             warrantyTitle: String,
//             warrantyProvider: String,
//             warrantyDetail: String,
//             warrantyDate: String
//         }
//     ]
// })

// const Vehicle = mongoose.model('Vehicle', vehicleSchema)

// vehicleSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

//const Vehicle = mongoose.model('Vehicle', vehicleSchema)


// get api
app.get('/api/vehicle-info', (request, response) => {
    Vehicle.find({}).then(vehicle => {
        response.json(vehicle)
    })
})

// get all vehicles
app.get('/vehicle-info', (request, response) => {
    Vehicle.find({}).then(vehicle => {
        response.json(vehicle)
    })
})

// get one vehicle
app.get('/vehicle-info/:id', (request, response) => {
    Vehicle.findById(request.params.id).then(vehicle => {
        response.json(vehicle)
    })
})

// delete one vehicle
app.delete('/vehicle-info/:id', (request, response) => {
    const id = request.params.id
    Vehicle.findByIdAndDelete(id).then(data => {
        response.json(data)
    })
})

// add vehicle
app.post('/vehicle-info', (request, response) => {
    if (!request.body.vin) {
        return response.status(400).json({
            error: 'VIN is missing!'
        })
    }

    const vehicle = new Vehicle(request.body)
    vehicle.save().then(result => {
        response.json(result)
    })
})

// update vehicle details
app.put('/vehicle-info/:id', (request, response) => {
    Vehicle.findByIdAndUpdate(request.params.id, request.body).then(result => {
        response.json(request.body)
    })

})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
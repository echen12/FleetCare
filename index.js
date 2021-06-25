require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Vehicle = require('./models/vehicleInfo')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))



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
        response.json(request.body)
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
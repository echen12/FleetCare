require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Vehicle = require('./models/vehicleInfo')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))



// get api
app.get('/api/vehicle-info', async (request, response) => {
    await Vehicle.find({}).then(vehicle => {
        response.json(vehicle)
    })
})

// get all vehicles
app.get('/vehicle-info', async (request, response) => {
    await Vehicle.find({}).then(vehicle => {
        response.json(vehicle)
    })
})

// get one vehicle
app.get('/vehicle-info/:id', async (request, response) => {
    await Vehicle.findById(request.params.id).then(vehicle => {
        response.json(vehicle)
    })
})

// delete one vehicle
app.delete('/vehicle-info/:id', async (request, response) => {
    const id = request.params.id
    await Vehicle.findByIdAndDelete(id).then(data => {
        response.json(data)
    })
})

// add vehicle
app.post('/vehicle-info', async (request, response) => {

    if (!request.body.vin) {
        return response.status(400).json({
            error: 'VIN is missing!'
        })
    }

    const vehicle = new Vehicle(request.body)

    await vehicle.save().then(result => {
        response.json(request.body)
    })

})

// update vehicle details
app.put('/vehicle-info/:id', async (request, response) => {
    await Vehicle.findByIdAndUpdate(request.params.id, request.body).then(result => {
        response.json(request.body)
    })

})

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, './build/index.html'), function (err) {
//         if (err) {
//             res.status(500).send(err)
//         }
//     })
// }) 

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
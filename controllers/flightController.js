const {Flights} = require('../models/Flight')
const{v4:uuid} = require("uuid")
// exports.example = (req, res) => {
//     console.log("example")
//     res.send("Flight example")
// }

//get all flight

exports.getAllFlights = async(req,res)=>{
    try {
        const flights = Flights
        res.status(200).json({
            message: "All Flights",
        flights: flights
        })
    } catch (error) {
        res.status(500).json({message: error})       
    }
}

// get a single flight

exports.getFlight = async (req,res) => {
    try {
        let id = req.params.id
        const flight = Flights.find((flight)=>flight.id===id)
        res.status(200).json({
            message: "Flight found",
            flight,
        })
    } catch (error) {
        res.status(500).json({message:error})
    }

}

//Add or Book a flight
exports.bookFlight = async (req,res) => {
    try {
        const{title,time,price,date} = await req.body
        const newFlight = {
            id:uuid(),
            title,
            time,
            price,
            date,
        }
        Flights.push(newFlight)
        res.status(201).json({
            message:"Flight Booked",
            newFlight
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//update or edit Flight

exports.updateFlight = async (req,res) => {
    try {
        let id = req.params.id
        const flight = Flights.find((flight)=> flight.id === id)
        const {title,time,price,date}= await req.body
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
        res.status(200).json({
            message: "Flight Updated",
            flight,
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//delete flight
exports.deleteFlight = async (req,res) => {
    try {
        let id = req.params.id
        const flight = Flights.find((flight)=>flight.id === id)
        Flights.splice(Flights.indexOf(flight),1)
        res.status(200).json({
            message: "Flight deleted",
            flight,
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}
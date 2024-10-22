const Bus = require("../../models/Bus");

//add a bus
const addBus = async (req, res) => {
  try {

    const { busType, capacity, startPoint, endPoint, busFare } = req.body;
    const newlyCreatedBus = new Bus({
        busType, capacity, startPoint, endPoint, busFare
    })

    await newlyCreatedBus.save()

    res.status(201).json({
        success : true,
        data : newlyCreatedBus,
    })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


//fetch all buses
const fetchAllBuses = async (req, res) => {
    
    try {
        
        const listOfBuses = await Bus.find({})

        res.status(200).json({
            success : true,
            data : listOfBuses,
        })

    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };


//edit a bus
const editBus = async (req, res) => {
  
    try {
  
        const {id} = req.params
        const { busType, capacity, startPoint, endPoint, busFare } = req.body;
        
        const bus = await Bus.findById(id)
        if(!bus){
            return res.status(404).json({
                success : false,
                message : "Bus Not Found"
            })
        }

        bus.busType = busType || bus.busType
        bus.capacity = capacity || bus.capacity
        bus.startPoint = startPoint || bus.startPoint
        bus.endPoint = endPoint || bus.endPoint
        bus.busFare = busFare || bus.busFare

        await bus.save()

        res.status(201).json({
            success : true,
            data : bus,
        })

    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };

//del a bus
const deleteBus = async (req, res) => {
  
    try {
        
        const {id} = req.params
        const bus = await Bus.findByIdAndDelete(id)
        if(!bus){
            return res.status(404).json({
                success : false,
                message : "Bus Not Found"
            })
        }

        res.status(201).json({
            success : true,
            message : "Bus Deleted Successfully",
        })
      
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };


  module.exports = {addBus,editBus,fetchAllBuses,deleteBus}
const orderService = require("../services/orderService.js")

const createOrder = async(req,res)=>{
    const user = await req.user;
    try {
        let createdOrder = await orderService.createOrder(user,req.body);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const findOrderById = async(req,res)=>{
    // console.log("Requested Order ID:", req.params.id); 
    try {
        let Order = await orderService.findOrderById(req.params.id)
        // console.log("Found Order:", Order); 
        return res.status(201).send(Order);
    } catch (error) {
        // console.error("Error finding order:", error.message); 
        return res.status(500).send({error:error.message})
    }
}
const orderHistory= async(req,res)=>{
    const user =await req.user;
    try {
        let Order = await orderService.usersOrderHistory(user._id)
        return res.status(201).send(Order);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createOrder,
    findOrderById,
    orderHistory
}

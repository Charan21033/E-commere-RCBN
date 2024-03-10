const cartItemservice =require("../services/cartItem.service.js")

const updateCartitem =async(req,res)=>{
    const user=await req.user
    try {
        const updatedCartItem = await cartItemservice.updateCartItem(user._id,req.params.id,req.body);
        return res.status(200).send(updatedCartItem);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const removeCartitem =async(req,res)=>{
    const user= await req.user
    try {
         await cartItemservice.removeCartItem(user._id,req.params.id)
        return res.status(200).send({message:"cart item removed successfully"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    updateCartitem,
    removeCartitem
}
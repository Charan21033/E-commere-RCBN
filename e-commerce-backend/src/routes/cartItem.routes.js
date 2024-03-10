const express =require("express");
const router =express.Router();

const cartItemController =require("../controller/cartitem.controller.js")
const authenticate = require("../middleware/authenticate.js");

router.put("/:id",authenticate,cartItemController.updateCartitem);
router.delete("/:id",authenticate,cartItemController.removeCartitem);

module.exports =router;
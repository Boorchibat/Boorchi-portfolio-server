const express = require("express");
const {getRecentMessages} = require("../controller/Messages/GetMessage");
const {sendMessage} = require("../controller/Messages/SendMessage");

const router = express.Router();

router.post("/sendMessage", sendMessage);

router.get("/getRecentMessage/:userId1/:userId2", getRecentMessages);




module.exports = router;

const express = require("express");
const router = express.Router();

const { sendContactEmail } = require("../controller/contact/contactControl");


router.post("/", sendContactEmail);

module.exports = router;
const express = require("express");
const router = express.Router();

const { sendContactEmail } = require("../controls/contactControl");

router.post("/contact", sendContactEmail);

module.exports = router;
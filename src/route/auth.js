const express = require("express");
const { CreateUser } = require("../controller/user/CreateUser");
const { signIn } = require("../controller/user/Signin");
const { updateUser } = require("../controller/user/UpdateUser");
const { deleteUser } = require("../controller/user/DeleteUser");
const { getUser } = require("../controller/user/GetUser");
const { authentication } = require("../middleware");

const router = express.Router();

router.post("/signup", CreateUser);

router.post("/signin",  signIn);

router.put("/:id", authentication, updateUser);

router.get("/:id", getUser);

router.delete("/:id", authentication, deleteUser);




module.exports = router;

const express = require("express");
const router = express.Router();
const {Users} = require("../models");

router.post("/", async (req, res) => {
    const { firstName, lastName, email, age, phoneNo, password} = req.body;
});

module.exports = router;
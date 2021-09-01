const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, age, phoneNo, password } = req.body;
  
  bcrypt.hash(password, 10).then((hash) =>{
      Users.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          age: age,
          phoneNo: phoneNo,
          password: hash,

      });
      res.send("success!");
  });
});

router.post('/login', async (req, res)=>{
    const {email,password} = req.body;
    const user = await Users.findOne({where: { email: email}});
    if (!user) res.json({ error: "User does not exist"});

    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) res.json({ error: "Wrong username or password combination"});
        res.json("You Logged in!!");

    });
});

module.exports = router;

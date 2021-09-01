const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const db = require("./models");

app.use(express.json());
//routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

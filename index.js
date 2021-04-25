const express = require("express");
const cors = require("cors");
const restsRoutes = require("./routes/restaurants");
const app = express();
// Middle ware....
app.use(cors());
app.use(express.json());

// Routes....
app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Reviewrz API",
    MainRoute: "/api/v1/rests",
    otherRoute: "api/v1/rests/:id",
  });
});
app.use("/api/v1/rests", restsRoutes);
app.listen(process.env.PORT);

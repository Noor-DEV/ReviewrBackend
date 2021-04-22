const express = require("express");
const cors = require("cors");
const restsRoutes = require("./routes/restaurants");
const app = express();

// Middle ware....
app.use(cors());
app.use(express.json());

// Routes....
app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.send("<h1>It worked Genius......</h1>");
});
app.use("/api/v1/rests", restsRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("UP and RUNING......");
});

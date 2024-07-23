const express = require("express");
const db = require("./config/db.js"); // Ensure this is set up to connect to your database
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

const userRoute = require("./routes/userRoutes.js");
app.use("/api/users", userRoute);

const inventoryRoute = require("./routes/inventoryRoutes.js");
app.use("/api/inventory", inventoryRoute);

const dashboardRoute = require("./routes/dashboardRoute.js");
app.use("/api/dashboard", dashboardRoute);

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});

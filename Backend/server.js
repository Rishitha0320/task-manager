
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(5000, () => console.log(" Server running on port 5000"));

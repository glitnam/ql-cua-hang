const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const connectDB = require("./config/db"); 

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/categories", categoryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy ở http://localhost:${PORT}`));

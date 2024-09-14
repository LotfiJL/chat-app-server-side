const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

// CORS Middleware

// app.use(
//   cors({
//     origin: "*",
//   })
// );

//************/

// CORS Middleware

// CORS Middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    allowedHeaders: "Content-Type, Authorization", // Allowed headers
  })
);

// Preflight request handling
app.options("*", cors());

/****** */
app.use(express.json());

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is Connected to Database");
  } catch (err) {
    console.log("Server is NOT connected to Database", err.message);
  }
};
connectDb();

app.get("/", (req, res) => {
  res.send("API is running123");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server is Running..."));

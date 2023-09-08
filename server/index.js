const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// Загружаем переменные из .env.local
const result = require("dotenv").config({ path: ".env.local" });

// Если .env.local успешно загружен, объединяем его переменные с .env
if (result.error) {
  throw result.error;
}
const router = require("./router/index");
const errorMiddleware = require("./middlewares/ErrorMiddleware");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    sameSite: "None",
    origin: ["http://localhost:4000", "http://127.0.0.1:4000"],
  })
);
app.use("/api", router);
app.use(errorMiddleware);

async function start() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log("dev server started..."));
  } catch (err) {
    console.log(err);
  }
}

start().then();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const dbConnect = require("./services/dbConnection");
const morgan = require("morgan");
const { PORT, MONGO_URI, SECRET_SESSION } = require("./services/config");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");

const app = express();

dbConnect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((e) => {
    console.log(e);
    throw new Error("Connecting to db error");
  });

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/", (req, res, next) => {
  res.status(200).send("Demo Endpoint");
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRouter);

function errorHandler(err, req, res, next) {
  const statusCode = err?.status || 500;
  const message = err?.message || "Internal Server Error";
  return res.status(statusCode).json({
    error: message,
  });
}

app.use(errorHandler);

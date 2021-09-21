const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// const flash = require('express-flash');
// const session = require('express-session');
const app = express();
app.use(cors());
// app.use(cors({ 'Access-Control-Allow-Origin': 'http:localhost:8080' }));

// ENV SETUP
require("dotenv").config();
const port = process.env.PORT;

// IMPORT ROUTES
const postRoutes = require("./routes/posts/post");
const ctgrRoutes = require("./routes/dashboard/category.routes");
const itemRoutes = require("./routes/dashboard/item.routes");
const userRoutes = require("./routes/auth/users");
const dashuserRoutes = require("./routes/dashboard/user.routes");
const orderRoutes = require("./routes/dashboard/order.routes");
const mpesaRoutes = require("./routes/mpesa/mpesa");
// const passport = require('passport');

// INITIALIZE DB
require("./db/db")();

// MIDDLEWARES
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/uploads")));

// app.use(flash());
// app.use(
//   session({
//     session: process.env.session_secret,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// ROUTE MIDDLEWARES
app.use("/api", postRoutes);
app.use("/api", ctgrRoutes);
app.use("/api", itemRoutes);
app.use("/api/user", userRoutes);
app.use("/api", dashuserRoutes);
app.use("/api", orderRoutes);
app.use("/api/mpesa", mpesaRoutes);

// LISTENING PORT
app.listen(port, () => {
  console.log(`App Listening on port: ${port}`);
});

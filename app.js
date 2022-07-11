require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "Project2-habit-tracker";

app.locals.appTitle = `Don't go breaking my chain! `;

app.use((req, res, next)=>{
    req.app.locals.userDetails = req.session.user
    next()
})

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const habitRoutes = require("./routes/habit.routes");
app.use("/", habitRoutes);

require("./error-handling")(app);

module.exports = app;

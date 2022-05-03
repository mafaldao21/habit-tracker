const router = require("express").Router();
const User = require("../models/User.model")
const Habit = require("../models/Habit.model")
const isLoggedIn = require("../middleware/isLoggedIn")

// Display 
router.get("/habits", (req, res, next) => {
    Habit.find()
        .populate("creator")
        .then((habitsArr) => {
            res.render("habits/habits-list", { habits: habitsArr })
        })
        .catch(error => {
            console.log("Error getting Habit from DB", error);
            next(error);
        })
})

//create

router.get("/habits/new", isLoggedIn, (req, res, next) => {
    res.render("habits/create-habit")
})

//Post

router.post("/habits/new", isLoggedIn, (req, res, next) => {
    const newHabit = {
        name: req.body.name,
        frequency: req.body.frequency,
        numberOfTimes: req.body.numberOfTimes,
        unit: req.body.unit,
    }
    Habit.create(newHabit)
        .then((habitFromDB) =>{
            res.redirect("/habits")
        })
        .catch(error => {
            console.log("Error creating Habits in DB", error);
            next(error);
        })
})


module.exports = router;
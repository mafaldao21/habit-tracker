const router = require("express").Router();
const User = require("../models/User.model")
const Habit = require("../models/Habit.model")
const isLoggedIn = require("../middleware/isLoggedIn");
const async = require("hbs/lib/async");

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
        .then((habitFromDB) => {
            res.redirect("/habits")
        })
        .catch(error => {
            console.log("Error creating Habits in DB", error);
            next(error);
        })
})

//Edit
router.get("/habits/:habitId/edit", isLoggedIn, (req, res, next) => {
    const id = req.params.habitId;
    Habit.findById(id)
        .then(habitDetails => {
            res.render("habits/edit-habit", habitDetails)
        })
        .catch(error => {
            console.log("Error creating Habits in DB", error);
            next(error);
        })
})

router.post("/habits/:habitId/edit", isLoggedIn, (req, res, next) => {
    const id = req.params.habitId;
    const newDetails = {
        name: req.body.name,
        frequency: req.body.frequency,
        numberOfTimes: req.body.numberOfTimes,
        unit: req.body.unit,
    }
    Habit.findByIdAndUpdate(id, newDetails)
        .then((habit) => {
            res.redirect("/habits")
        })
        .catch(error => {
            console.log("Error creating Habits in DB", error);
            next(error);
        })
})

//Delete command

router.post("/habits/:habitId/delete", isLoggedIn, (req, res, next) => {
    const id = req.params.habitId;
    Habit.findByIdAndRemove(id)
    .then((response) => { 
        console.log(response)
        res.redirect("/habits")
    })
    .catch(error => {
        console.log("Error deleting Habits in DB", error);
        next(error);
   })
})


module.exports = router;
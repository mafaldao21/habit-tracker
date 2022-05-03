const {
    default: mongoose
} = require("mongoose");

const {
    Schema,
    model
} = require("mongoose");


const habitSchema = new Schema({
    name: {
        type: "String",
        required: true,
    },
    frequency: {
        type: "String",
        enum: ["Daily", "Weekly", "Monthly"],
    },
    numberOfTimes: {
        type: Number,
        required: true,
    },
    unit: {
        type: "String",
        enum: ["Liters", "Minutes", "Hours", "Times"],
    },
    /*image: {
        type: "String",
        default: "images/habitIcon.png",
    },*/
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const newHabit = model("newHabit", habitSchema);

module.exports = newHabit;
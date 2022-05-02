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
    image: {
        type: "String",
        default: "../../public/images/png-transparent-computer-icons-checklist-icon-design-graphic-design-information-miscellaneous-text-logo.png",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const newHabit = model("newHabit", habitSchema);

module.exports = newHabit;
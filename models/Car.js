const { Schema, model } = require("mongoose")

const carSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
        unique: true
    },
    factory: {
        type: String,
        required: true,
    },
    year: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    optional: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

module.exports = model("Car", carSchema)
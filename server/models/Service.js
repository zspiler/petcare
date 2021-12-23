const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sitter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateFrom: {
        type: Date,
        required: true,
    },
    dateTo: {
        type: Date,
        required: true,
    },
    pricePerDay: {
        type: Number,
        required: true,
    },
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    }],
    type: {
        type: String,
        default: 'petSitting',
    },
    animalsType:[{
        type: String,
    }],
    aboutMe: {
        type: String,
    },
    experience:{
        type:String,
    },
});

Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;


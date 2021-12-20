const mongoose = require("mongoose");

// enum AnimalType {
//     Cat,Dog,Hamster,Turtle,Fish,
//     Bird,Reptile,Rabbit,Other
// }

const AnimalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    oldness: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    description: {
        type: String,
    },
    serviceDescription: {
        type: String,
    }
});

Animal = mongoose.model("Animal", AnimalSchema);
module.exports = Animal;

const express = require("express");
const axios = require("axios");
const { validationResult, query } = require("express-validator");
const User = require("../models/User");
const Animal = require("../models/Animal");
const Service = require("../models/Service")

const router = express.Router();
const path = '/api/service';

router.get("/", getServices)
router.post("/", postService)

async function getServices(request, response){
    console.log(`GET ${path}/`);

    //const user = await User.findOne({ email: request.email });
    console.log(request)

    response.status(200).send()
}

async function postService(request, response){
    console.log(`POST ${path}/`);

    const { userId, dateFrom, dateTo, pricePerDay, animalsString} = request.body;
    const animals = JSON.parse(animalsString)
    let animalsObj = []

    for (const animal of animals) {
        const { owner, name, type, oldness, weight, description,serviceDescription,picture,pictureUrl} = animal
        const newAnimal = await new Animal({
            name:name,
            user:owner,
            type:type,
            oldness:oldness,
            weight:weight,
            description:description,
            serviceDescription:serviceDescription,
            picture:pictureUrl
        }).save();
        
        animalsObj.push(newAnimal)
    }
       
    const job = new Service({
        user: userId, 
        sitter: null,
        dateFrom: dateFrom, 
        dateTo: dateTo, 
        pricePerDay: pricePerDay,
        animals: animalsObj
    })
    await job.save()

    response.status(200).send()

}

module.exports = router;
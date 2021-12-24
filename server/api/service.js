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
router.post("/offer", postServiceOffer)
router.post("/search", postSearchService)

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
    const animalsType = []
    let animalsObj = []

    for (const animal of animals) {
        const { owner, name, type, age, weight, description,serviceDescription,picture,pictureUrl} = animal
        const newAnimal = await new Animal({
            name:name,
            user:owner,
            type:type,
            age:age,
            weight:weight,
            description:description,
            serviceDescription:serviceDescription,
            picture:pictureUrl
        }).save();
        animalsType.push(type)
        animalsObj.push(newAnimal)
    }
       
    const job = new Service({
        user: userId, 
        sitter: null,
        dateFrom: dateFrom, 
        dateTo: dateTo, 
        pricePerDay: pricePerDay,
        animals: animalsObj,
        animalsType: animalsType
    })
    await job.save()

    response.status(200).send()

}

async function postServiceOffer(request, response){
    const { userId, dateFrom, dateTo, pricePerDay, type,animalsType,aboutMe,experience} = request.body;

    const job = new Service({
        user: userId, 
        sitter: null,
        dateFrom: dateFrom, 
        dateTo: dateTo, 
        pricePerDay: pricePerDay,
        type: type,
        animalsType: animalsType,
        aboutMe: aboutMe,
        experience: experience
    })
    
    await job.save()

    response.status(200).send()
}

async function postSearchService(request,response){
    console.log(`post ${path}/search`);

    const { offering,region,animalType,sortBy} = request.body;
    
    let query = {
        type: offering ? 'serviceOffering' : 'petSitting',
    }
    if(animalType !== '') query.animalsType = {$in: animalType}
    
    let cityQuery = {}
    if(region !== '') cityQuery.city=region

    let sort = {}
    let sortType = sortBy.includes('ascending') ? 'ascending' : 'descending' 
    if(sortBy.includes('Date')) {
        sort.dateFrom=sortType
    }
    if(sortBy.includes('Price')) {
        sort.pricePerDay=sortType
    }

    const services = await Service.find(query)
        .sort(sort)
        .populate("animals user",null,cityQuery)

    //Remove services where user is null
    const filtered = services.filter(function (service) {
        return service.user !== null;
    });

    response.json(filtered)
}

module.exports = router;
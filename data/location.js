const mongoCollection = require("../database/mongoCollection");
const locationCollectionObj = mongoCollection.location;
const IPUtils = require("../utils/IPUtils")

const getLocation = async (ip) => {
    if(!ip || typeof ip !== 'string') throw "You must enter IP Address before searching";

    var numArr = ip.split(".");
    if(numArr.length !== 4) throw "Invalid Ip Format";

    numArr.forEach( (num) => {
        if(isNaN(num) || parseInt(num) < 0 || parseInt(num) > 255)
           throw "Invalid Ip Format";} );

    const IPNumber = IPUtils.convertIPtoInt(ip);
    const locationCollection = await locationCollectionObj();
    const res = await locationCollection.findOne({$and: [{ip_start:{$lte : IPNumber}},
        {ip_end : {$gte : IPNumber}}]})
    
    if(res == null)
        throw "IP not found";

    const data = {
        id: res._id,
        ip: ip,
        city: res.location.city,
        state: res.location.stateprov,
        country : res.location.country,
        lat : parseFloat(res.location.latitude),
        lng : parseFloat(res.location.longitude)
    }

    return data;
    
}



const addAllLocation =  async(locations)=>{
    const locationCollection = await locationCollectionObj();
    locations.forEach( (location) => {
        addLocation(location);
    })
}

const addLocation = async (location) => {
    const IPStartInt = IPUtils.convertIPtoInt(location.ip_start);
    const IPEndInt = IPUtils.convertIPtoInt(location.ip_end);
    
    const locationObj = {
        location : location,
        ip_start : IPStartInt,
        ip_end : IPEndInt
    }

    const locationCollection = await locationCollectionObj();
    const insertInfo = await locationCollection.insertOne(locationObj);
}

module.exports = {
    getLocation,addAllLocation
}
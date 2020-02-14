const mongoCollection = require("../database/mongoCollection");
const locationCollection = mongoCollection.location;

const getLocation = async function getLocation(ip){
    if(!ip || typeof ip !== 'string') throw "You must enter IP Address before searching";

    var numArr = ip.split(".");
    if(numArr.length !== 4) throw "Invalid Ip Format"
    
    console.log(numArr);

    numArr.forEach( (num) => {
        if(isNaN(num) || parseInt(num) < 0 || parseInt(num) > 999)
           throw "Invalid Ip Format";} );
    

    const dummyData = {
        ip: ip,
        city: "Jersey city",
        state: "New Jersey",
        country : "United States"
    }

    return dummyData;
    
}

module.exports = {
    getLocation
}
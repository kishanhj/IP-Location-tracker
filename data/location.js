const mongoCollection = require("../database/mongoCollection");
const locationCollectionObj = mongoCollection.location;

const getLocation = async (ip) => {
    if(!ip || typeof ip !== 'string') throw "You must enter IP Address before searching";

    var numArr = ip.split(".");
    if(numArr.length !== 4) throw "Invalid Ip Format";

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

const addAllLocation =  async(data)=>{
    const locationCollection = await locationCollectionObj();
    const insertInfo = await locationCollection.insertMany(data);
}

module.exports = {
    getLocation,addAllLocation
}
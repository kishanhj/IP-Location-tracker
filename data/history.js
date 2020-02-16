const mongoCollection = require("../database/mongoCollection");
const historyCollectionObj = mongoCollection.history;
// const ISODate = require("mongo").ISODate;

const addNewSearch = async (searchInput,searchResult,errors) => {
    var city = '-';
    var country = '-';
    var error = '-';

    if(searchResult && searchResult.city)
        city = searchResult.city;
    
    if(searchResult && searchResult.country)
        country = searchResult.country;

    if(errors.length == 1)
        error = errors[0];

    var date = new Date();
    var dateMil = date/1000;
    const data = {
        searchInput : searchInput,
        date : date,
        dateMil : dateMil,
        city : city,
        country : country,
        errors: error
    }

    const historyCollection = await historyCollectionObj();
    historyCollection.insertOne(data);
} 

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
   }

const getSearchHistory = async (startDate,endDate,numOfRecords) => { 

    console.log("Before :"+startDate+":");

    if(startDate)
        startDate =  new Date(`${startDate}`);
    if(endDate)
        endDate =  new Date(`${endDate}`);   
    if(!numOfRecords)
        numOfRecords = 20;
    numOfRecords = parseInt(numOfRecords);

    //console.log("after :"+startDate);
    const historyCollection = await historyCollectionObj();
    if(!startDate && !endDate){
        const res =  await historyCollection.find({})
        .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    } else if(!startDate && endDate){
        //console.log("only end: "+endDate)
        const res =  await historyCollection.find({date : {$lte : endDate}})
        .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    } else if(startDate && !endDate){
        // console.log("here");
        const res =  await historyCollection.find({date : {$gte : startDate}})
        .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    } else {
        const res =  await historyCollection
            .find({$and : [{date : {$gte : startDate}},{date : {$lte : endDate}}]})
            .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    }
    
}



module.exports = {addNewSearch,getSearchHistory}
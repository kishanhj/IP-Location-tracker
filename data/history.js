const mongoCollection = require("../database/mongoCollection");
const historyCollectionObj = mongoCollection.history;
const ISODate = require("mongo").ISODate;

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

    const data = {
        searchInput : searchInput,
        date : new Date(),
        city : city,
        country : country,
        errors: error
    }

    const historyCollection = await historyCollectionObj();
    historyCollection.insertOne(data);
} 

const getSearchHistory = async (startDate,endDate,numOfRecords) => { 
    console.log(ISODate); 
    if(!startDate)
        startDate =  Date.parse(startDate);
    if(!endDate)
        startDate =  Date.parse(endDate);   
    if(!numOfRecords)
        numOfRecords = 20;
    numOfRecords = parseInt(numOfRecords);

    if(!startDate && !endDate){
        const historyCollection = await historyCollectionObj();
        const res =  await historyCollection.find({})
        .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    } else if(!startDate && endDate){
        console.log("only end: "+endDate)
        const historyCollection = await historyCollectionObj();
        const res =  await historyCollection.find({date : {$lte : endDate}})
        .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    } else if(startDate && !endDate){
        const historyCollection = await historyCollectionObj();
        const res =  await historyCollection.find({date : {$gte : startDate}})
        .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    } else {
        const historyCollection = await historyCollectionObj();
        const res =  await historyCollection
            .find({$and : [{date : {$gte : startDate}},{date : {$lte : endDate}}]})
            .sort({$natural:-1}).limit(numOfRecords).toArray();
        return res;
    }
    
}



module.exports = {addNewSearch,getSearchHistory}
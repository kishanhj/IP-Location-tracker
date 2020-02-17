const path = require("path");
const locationDataApi = require("../data/location")
const historyDataApi = require("../data/history");
const MessageApi = require("../Utils/message");

const constructorMethod = app => {
  app.get("/", (req, res) => {
    res.render("search");
  });

  app.post("/search",async (req,res) => {
    const errors = [];
    var location;
      try{
       location = await locationDataApi.getLocation(req.body.ip,req.body.phoneNumber);
        MessageApi.messageClient(location);
        res.render("search",{
          "location":location
        });

      } catch(err){
        errors.push(err)
        
        res.render("search",{
          errors:errors
        });
      } finally {
        historyDataApi.addNewSearch(req.body.ip,location,errors);
      }
  });

  app.get("/history", (req, res) => {
    res.render("history");
  });

  app.post("/history",async (req,res) => {

    try {
      const history = await historyDataApi.getSearchHistory(req.body.startDate,req.body.endDate,req.body.numberOfRec)
      // console.log("history "+history.length);
      res.render("history",{history:history});
    }catch(err){
        // console.log(err);
    }
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;

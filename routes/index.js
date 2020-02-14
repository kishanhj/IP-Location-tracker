const path = require("path");
const locationDataApi = require("../data/location")

const constructorMethod = app => {
  app.get("/", (req, res) => {
    res.render("search");
  });

  app.post("/search",async (req,res) => {
      try{
        const location = await locationDataApi.getLocation(req.body.ip);
        res.render("search",{
          "location":location
        });

      } catch(err){
        const errors = [];
        errors.push(err)
        
        res.render("search",{
          errors:errors
        });
      }
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;

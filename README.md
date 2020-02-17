# IP-Location-tracker 

Search geo location from IP-addresses


## Deployment

1. Open command promt in the folder where you clone
2. run command "npm install"
3. run command "npm start"

Data is stored in Mongo-Atlas cloud but if you want to store the data locally change setting.json in database folder to point to local mongoDB then run command "npm run seed"

For google map to work make sure you run in 3000 port and url as http://localhost:3000/

## Data

Due to storage constraints only 150000 locations are saved in the MongoDB with IP range [1.0.0.0 - 27.76.63.255]

## SMS service from AWS SNS

SMS service will work in appliaction hosted on HEROKU in URL : https://morning-headland-59743.herokuapp.com/history
For running locally we need to and an .env file

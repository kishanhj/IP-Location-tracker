const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const locationDataApi = require('./data/location');
 
fs.createReadStream('seed.csv')
  .pipe(csv(['ip_start', 'ip_end','continent','country','stateprov','city','latitude','longitude']))
  .on('data', (data) => results.push(data))
  .on('end', () => {
  locationDataApi.addAllLocation(results);
  });
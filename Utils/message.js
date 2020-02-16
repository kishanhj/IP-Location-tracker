var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'AKIAIPPALOEDHF626AVQ',
  secretAccessKey: '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',
  region: 'us-east-1'});

const messageClient = (location) => {

  if(location.errors || !location.phone)
    return;

  var params = {
    Message: `${location.ip} is in ${location.city} ${location.state} ${location.country}`,
    PhoneNumber: `1${location.phone}`,
  };

  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  publishTextPromise.then(
    function(data) { 
      console.log("message sent "+params.PhoneNumber) 
      return true;
    }).catch(
      function(err) {
        console.log(err);
        throw err;
  });

}


module.exports = {messageClient} 

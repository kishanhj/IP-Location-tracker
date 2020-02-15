const convertIPtoInt = (ip) => {
    var arrIP = ip.split(".");
    return parseInt(arrIP[3])+( parseInt(arrIP[2]) * 256)
    +(parseInt(arrIP[1]) * 65536)+(parseInt(arrIP[0]) * 16777216)
}

const validateIP = (ip) => {
    if(!ip || typeof ip !== 'string') return "You must enter IP Address before searching";

    var numArr = ip.split(".");
    if(numArr.length !== 4) return "Invalid Ip Format";

    numArr.forEach( (num) => {
        if(isNaN(num) || parseInt(num) < 0 || parseInt(num) > 255)
           return "Invalid Ip Format";} );
    
    return "OK";
}

module.exports = {convertIPtoInt};
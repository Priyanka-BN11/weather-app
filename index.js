let request = require('request');
let apiKey = 'ea712579bc237cf2d06efae53a72fb35';
let city = 'munich';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function(err, response, body){
    if(err){
        console.log('error:',error);
     } else {
        console.log('body:', body);
     }
});
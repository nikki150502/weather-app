const http = require('http');

const fs = require('fs');
var requests = require("requests");
const { Console } = require('console');

const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempVal, orgVal)=>{
  let temperature = tempVal.replace("{%tempVal%}", orgVal.main.temp);
     temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
     temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
     temperature = temperature.replace("{%location%}", orgVal.name);
      temperature = temperature.replace("{%country%}", orgVal.sys.country);
      return temperature;

    
};
 
const server =  http.createServer((req, res)=>{
   
   
    if(req.url=="/"){
    requests(
       
        'https://api.openweathermap.org/data/2.5/weather?q=jaipur&appid=a21ab63e90ac7ec77a2b1c6035597739'
         )
           .on('data', (chunk)=> {
            const objdata =JSON.parse(chunk);
            const arrData = [objdata];
            //  console.log(arrData[0].main.temp);
            const realTimeData = arrData
            .map(val => replaceVal(homeFile , val))
            .join("");
              
          res.write(realTimeData);
          console.log(realTimeData);
             })
         .on('end', (err)=> {
         if (err) return console.log('connection closed due to errors', err);
 
         console.log('end');
    });
    }
     
});

server.listen(8080, '127.0.0.1'); 
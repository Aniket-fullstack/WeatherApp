const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){


const query = req.body.cityName;

const apiKey = "424b987d1c4bc39468e06174c307fd87";

const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+"&units="+unit;
https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){

const weatherData= JSON.parse(data);

    console.log(weatherData);

    const weatherDescription = weatherData.weather[0].description

    const temp =weatherData.main.temp
    console.log(temp);

    const icon = weatherData.weather[0].icon;
    const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";


    res.write("<p>The weather in "+query+" Is "+weatherDescription+"!!!</p>");

    res.write("<h1>The temperature  in "+query+" Is "+temp+ " Degree Celcius</h1>");
    res.write("<img src = "+imageUrl+">");
    res.send();


});


 })

})



app.listen(3000,function(){
   console.log("The Server Is Running On Port 3000");
})

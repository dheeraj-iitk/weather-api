var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const request = require('request');
const apiKey = 'f7583e5c05fe1589f74fbc15500ac4d6';


app.set("view engine","jade");
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index");
});
app.post("/",function(req,res){
    let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      console.log(body);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
          console.log(weather.main);
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;//the body(weather) contains every thing about the city
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
app.listen("3000",function(err,docs){
    console.log("server is running");
});
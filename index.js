const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const name = req.body.fname;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const standard = req.body.standard;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          CLASS: standard,
          PHONE: mobile
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/bbaee53c86";
  const options = {
    method: "POST",
    auth: "aayush1:06a083938423b90cb5c88a39f183ebf1-us7"
  };
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

// 06a083938423b90cb5c88a39f183ebf1-us7
// bbaee53c86

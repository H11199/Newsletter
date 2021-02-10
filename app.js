const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.Email;
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/9e0efe73a6";
  const options = {
    method: "POST",
    auth: "Himanshu11199:3d754c1a08fbbc386402074b830bdb32-us1",
  };
  const request = https.request(url, options, function (response) {
    let status = response.statusCode;
    if (status === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("server is ready on port 3000");
});
//3d754c1a08fbbc386402074b830bdb32-us1
//list id
//9e0efe73a6

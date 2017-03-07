var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var clientPath = path.join(__dirname, "../client");
var jsonPath = path.join(__dirname + "/data.json");


app.use(express.static("client"));
app.use(bodyParser.json());


app.get("/", function (req, res) {
    res.send(clientPath + "index.html");
});


app.route('/api/chirps')
    .get(function (req, res) {
        res.sendFile(jsonPath);
    })
    .post(function (req, res) {
       
            fs.readFile(jsonPath, "utf8", function (err, data) {
                if (err) {
                    console.log("you have an error");
                    res.sendStatus(404);
                } else {
                    var allChirps = JSON.parse(data);

                    allChirps.push(req.body);
                    fs.writeFile(jsonPath, JSON.stringify(allChirps), function (err) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.sendStatus(201);
                        }
                    });
                }
        });
    });



//read the file, parse the json array, push the chirp onto the array, write the stringified array to the file 


app.listen(3000);
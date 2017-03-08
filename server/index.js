var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

//path.join is like a cursor. dirname gives the absolute path to the folder we're in. 
var clientPath = path.join(__dirname, "../client");
var jsonPath = path.join(__dirname, "data.json");

//express.static is a function 
app.use(express.static(clientPath));
app.use(bodyParser.json());

app.route('/api/chirps')
    .get(function (req, res) {
        res.sendFile(jsonPath);
    })
    .post(function (req, res) {
        //utf8 means I get a string, not a buffer
            fs.readFile(jsonPath, "utf8", function (err, data) {
                if (err) {
                    //500 means internal server error
                    res.sendStatus(500);
                } else {
                    //creates javascript array
                    var allChirps = JSON.parse(data);
                    //info in new chirp
                    var newChirp = req.body;
                    //pushed new chirp onto the array
                    allChirps.push(newChirp);
                    //tell it to go to the json file, make the array a json object, and callback for error
                    fs.writeFile(jsonPath, JSON.stringify(allChirps), function (err) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(201);
                        }
                    });
                }
        });
    });

app.listen(3000);
console.log("server listening on port 3000");
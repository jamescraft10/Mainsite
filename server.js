const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/home.html', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});
app.get('/home', (req, res) => {
    fs.readFile(__dirname + '/home.html', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

LobbyGet('Main');
LobbyGet('Programming');
LobbyGet('Math');
LobbyGet('Cubing');
LobbyGet('Gaming');

// Lobby Get
function LobbyGet(Name) {
    var NameWithSlash = '/' + Name;
    // Main
    app.get(NameWithSlash, (req, res) => {
        fs.readFile(__dirname + '/index.html', (err, data) => {
            if (err) throw err;
            res.write(data);
            ReadFiles(res);
        });
    });

    function ReadFiles(res) {
        fs.readFile(__dirname + '/Lobbys/' + Name + '.txt', (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }

    // Messaged
    app.post(NameWithSlash, (req, res) => {
        var Message = req.body.Message;
        var Username = req.body.Username; 

        Message = "<br><div class=\"MessageAll\"><img src=\"./DefaultPfp.jpg\" id=\"MessageImg\"/><h3 id=\"MessageName\">" + Username + "</h3><h2 id=\"Message\">" + Message + "</h2></div><br><br><br>";

        if(Username == undefined || Username == null || Username == "")
            Message = "";

        fs.appendFileSync('./Lobbys/' + Name + '.txt', Message);

        console.log(Name + ': ' + Message);

        res.redirect(NameWithSlash);
    });
}

// Images
app.get('/DefaultPfp.jpg', (req, res) => {
    res.sendFile(__dirname + '/Images/DefaultPfp.jpg');
});
 
app.listen(8080, () => {
    console.log('Started');
});
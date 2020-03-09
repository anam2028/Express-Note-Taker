// ===============================================================================
// LOAD DATA
// We are linking our routes to a db.json sources.
// These db json hold information to create data.
// ===============================================================================

var path = require("path");
const fs = require("fs");
const notedatabase = require('../db/db.json');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users reads the notes 

    // ---------------------------------------------------------------------------

    app.get('/api/notes', function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            res.json(JSON.parse(data))
            console.log("PARSE:" + data);
        });
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post('/api/notes', function (req, res) {
        var newNoteReceived = JSON.stringify(req.body);
        console.log("req.body is :" + JSON.stringify(req.body));

        notedatabase.push(req.body);
        console.log(notedatabase)

        res.json(true)
        notedatabaseString = JSON.stringify(notedatabase)
        fs.writeFile(path.join(__dirname, "../db/db.json"), notedatabaseString, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
        });
    });
};

// anamikas-MacBook-Pro:Express-Note-Taker anamika$ node server.js 
/*App listening on PORT: 8000
PARSE:[{"tittle":"hello","text":"whatsup"},{"title":"NoteNote1","text":"TextText22"},{"title":"note2note2","text":"text2text2"},{"title":"New Note3","text":"todo list for today"},{"title":"T4","text":"X4"},{"title":"test","text":"test"}]
PARSE:[{"tittle":"hello","text":"whatsup"},{"title":"NoteNote1","text":"TextText22"},{"title":"note2note2","text":"text2text2"},{"title":"New Note3","text":"todo list for today"},{"title":"T4","text":"X4"},{"title":"test","text":"test"}]
req.body is :{"title":"m","text":"j"}
[
  { tittle: 'hello', text: 'whatsup' },
  { title: 'NoteNote1', text: 'TextText22' },
  { title: 'note2note2', text: 'text2text2' },
  { title: 'New Note3', text: 'todo list for today' },
  { title: 'T4', text: 'X4' },
  { title: 'test', text: 'test' },
  { title: 'm', text: 'j' }
]
undefined:1

*/
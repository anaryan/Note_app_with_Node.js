var express = require('express');
var bodyParser = require('body-parser');

let note = [{ id: 1, body: "Rome's Colosseum is one of seven wonders of the world" }, { id: 2, body: 'Paris is a very beautiful city' }, {id: 3, body: 'Titanic is one of my favorite movies'}];

//Call the body-parser and express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('notes', {
    note: note
  });
});

app.post("/addNotes", function (req, res) {
  //assigning Note id to the notes using math.random
  const userNote = {};
  userNote.id = Math.random() * 100;
  userNote.body = req.body.newNote
  note.push(userNote);
  //then we redirect it to the root route
  res.redirect('/');
});

//Handling the delete request

app.post('/deleteNote/:id', function (req, res) {
  console.log(req.params.id);
  const deleteNotes = note.filter(item => item.id != req.params.id);
  note = deleteNotes;
  return res.redirect('/');
});


app.listen(5000, function() {
	console.log("Note_app server is running at port 5000");
});
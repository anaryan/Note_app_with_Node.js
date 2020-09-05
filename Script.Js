//Adding the frameworks

var express = require('express');
var bodyParser = require('body-parser');

//Demo Notes
let note = [{ id: 1, body: "Rome's Colosseum is one of seven wonders of the world" }, { id: 2, body: 'Paris is a very beautiful city' }, {id: 3, body: 'Titanic is one of my favorite movies'}];

//Callinig body-parser and express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));  //It serves static file
app.set('view engine', 'ejs');    //installing ejs and creating a file notes.ejs inside views folder in Note_app

//Setting up the route for the Note app.
app.get('/', function (req, res) {
  res.render('notes', {
    note: note
  });
});

app.post("/addNotes", function (req, res) {
  const userNote = {};
  userNote.id = Math.random() * 100;  //to assign the note id
  userNote.body = req.body.newNote
  note.push(userNote);
  //redirecting to root route
  res.redirect('/');
});

//To handle the delete request made in notes.ejs
app.post('/deleteNote/:id', function (req, res) {
  console.log(req.params.id);
  const deleteNotes = note.filter(item => item.id != req.params.id);
  note = deleteNotes;
  return res.redirect('/');   //redirecting to root route
});

//Adding a listening port
app.listen(5000, function() {
	console.log("Note_app server is running at port 5000");
});
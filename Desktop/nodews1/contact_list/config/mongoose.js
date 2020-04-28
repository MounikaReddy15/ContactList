// require the library
const mongoose = require('mongoose');

//connected to the db
mongoose.connect('mongodb://localhost/contacts_list_db', {useNewUrlParser: true});

// the connection bw DB and mongoose is db
// acquire the connection to check if it is sucessful
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//if connection is succesful, if connection is open
db.once('open', function() {
  console.log('we are connected!');
});
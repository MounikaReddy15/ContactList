const express = require('express');

// path is an inbuilt module
const path = require('path');
const port = 8000;

//app has all the functionalities of the above libraries

const app = express();

// to tell express ejs is the view engine
// app has multiple property now we set ejs for view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//to handle req res
app.get('/', function(req,res) {
    // console.log(req);

    //dirname shows the current file path
    // console.log('dir', __dirname);
    // res.send('<h1>Cool, is it running! or is it?</h1>');

    //to render from ejs view

    //displays home.ejs
    // return res.render('home');

    //to change title dynamically
    return res.render('home', 
    {'title': 'My Contacts List'});

});


app.get('/practice', function(req,res) {
    return res.render('practice',
    {'title' : 'Let us play with ejs'});
});
   

//to run the server

app.listen(port, function(err) {
    if(err) {
        console.log('error', err);
    }

    console.log('Yup! My Express server is running on port:', port);
});
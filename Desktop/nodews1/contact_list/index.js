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

//app.use signifies middleware
app.use(express.urlencoded());

var contactList = [
    {
        name: "Mona",
        phone: "678890"
    },
    {
       name: "Raju",
       phone: "34567"
    },
    {
        name: "Nenu",
        phone: "0000"
    }
]
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
    {title: 'Contacts List',
    contact_list: contactList

});

});


app.get('/practice', function(req,res) {
    return res.render('practice',
    {'title' : 'Let us play with ejs'});
});
   
app.post('/create-contact', function(req,res){
    //shows objects
    // console.log(req.body);
    
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });
    // can be written as

    contactList.push(req.body);

    return res.redirect('/');
    
    //going back to the same page
    //return res.redirect('back');
    
    // return res.redirect('/practice');
});


//to run the server
app.listen(port, function(err) {
    if(err) {
        console.log('error', err);
    }

    console.log('Yup! My Express server is running on port:', port);
});
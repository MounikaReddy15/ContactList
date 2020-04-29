const express = require('express');

// path is an inbuilt module
const path = require('path');
const port = 8000;

const db= require('./config/mongoose');
const Contact = require('./models/contact');


//app has all the functionalities of the above libraries

const app = express();

// to tell express ejs is the view engine
// app has multiple property now we set ejs for view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app.use signifies middleware
//middleware is a func which has access to both req & res
//express.url encoded is called before every controller
//url encoded reads the form data not the params
app.use(express.urlencoded());

// to access static files
app.use(express.static('assets'));

//middleware 1
//next calls next middleware else controller
app.use(function(req,res,next){
    //to manipulate data
    // req.myName = "Mona";
    // console.log('m1 called');
    next();
});
app.use(function(req,res,next){
    // console.log("my name from mw2", req.myName);
    // console.log('m2 called');
    next();
});


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
 
    // to access middleware data here 
    //middleware can be at beginning, in and after controllers
//   console.log('route controller',  req.myName);
     
  //fetch contacts db
  // find is used for quering
  Contact.find({}, function(err, contactList) {
      if(err) {
          console.log('Error in fetching contacts from db');
          return;
      }
      //to change title dynamically
    return res.render('home', 
    {title: 'Contacts List',
    contact_list: contactList
 
});
  })
    

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

    // contactList.push(req.body);
    
    //now we have to push in DB/collection
    Contact.create ({
          name: req.body.name,
          phone: req.body.phone
    },function(err, newContact){
        if(err) {
            console.log('error in creating a contact');
            return;
        }

        console.log('******', newContact);
        return res.redirect('back');
    });
    // return res.redirect('/');
    
    //going back to the same page
    //return res.redirect('back');
    
    // return res.redirect('/practice');
});

//string param   
//  app.get('/delete-contact/:phone', function(req,res) {
    app.get('/delete-contact', function(req,res) {

        // console.log(req.params);
        // let phone= req.params.phone;

        //query param
        // let phone = req.query.phone;

        //get the id from query in the url
        let id = req.query.id;

        //find the contact in the db using id and delete
       Contact.findByIdAndDelete(id, function(err) {
           if(err) {
               console.log('error in deleting an object from the db');
               return;
           }
           return res.redirect('back');
       });




        // let contactIndex =  contactList.findIndex(contact => contact.phone == phone);

        // if(contactIndex!=-1) {
        //     contactList.splice(contactIndex ,1);
        // }

        
    });

//to run the server
app.listen(port, function(err) {
    if(err) {
        console.log('error', err);
    }

    console.log('Yup! My Express server is running on port:', port);
});
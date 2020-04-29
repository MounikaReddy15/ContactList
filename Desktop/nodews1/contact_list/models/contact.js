//mongoose is required to create schema

const mongoose = require('mongoose');

//schema

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }

});

// compiling our schema into a model
const Contact  = mongoose.model('Contact', contactSchema);

// finally export
module.exports = Contact;
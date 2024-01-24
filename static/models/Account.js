const { text } = require('express');
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add name'],
        unique: true,
        trim: true,
        maxlength: [25, 'Name cannot be more than 25 characters']
    },

   
    
    email: {
        
         type: String,
        match: [
            
            // email validation
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ]
     
    },
    
    password: String,
   

    createAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Account', AccountSchema);
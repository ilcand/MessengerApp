const Account = require('../models/Account');
const fs = require('fs');
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));



// middleware function
 exports.getAccounts = async(req, res, next) =>{
    
    try{
        const accounts = await Account.find();    
        res.status(200).json({success: true, count: accounts.length, data: accounts});   
       // res.redirect('http://localhost:3000/static/index.html');
    } 
     catch(err){
        res.status(400).json({success: false});
    }
 }

   exports.verifyAccount = async(req, res, next) => {
//  res.status(200).json({success:true, placeholder: 'Accessed'})
    console.log(req.body);
     try{
       

        const accounts = await Account.find();

        let loginAccount = new Account({
             username: req.body.username,
          password: req.body.password
             
         })
         console.log(loginAccount);

        for(let i = 0; i < accounts.length; i++){
             console.log('name: ' + accounts[i].username,'pass: ' + accounts[i].password)
            
             if(accounts[i].username === req.body.username){
                 console.log('FOUND USERNAME !');
            }else{
                 console.log("username not found !");
             }
         }
         res.status(200).json({success: true, placeholder: 'Accessed'})

     }catch(err){
         res.status(400).json({success: false});
     }
 
    
 }

// middleware function
exports.getAccount = async(req, res, next) =>{
    //res.status(200).json({success: true, msg: `Show Account ${req.params.id}`});
    try{
        const account = await Account.findById(req.params.id);
        
        if(!account){
            return res.status(400).json({success: false});
        }
    
        res.status(200).json({ success: true, data: account});
       }catch(err){
            res.status(400).json({ success: true})
       }
}


// @description    update(change password) on a single account
// @add route      PUT /api/accounts/:id
// @access         Private -> authorization needed



// middleware function
exports.updateAccount = (req, res, next) =>{
    res.status(200).json({success: true, msg: `Update Account ${req.params.id}`});
}

exports.deleteAccount = (req, res, next) =>{
    res.status(200).json({success: true, msg: `Delete Account ${req.params.id}`});
}


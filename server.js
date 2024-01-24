const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const formatMessage = require('./static/messages');
const bodyParser = require('body-parser');



const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './static/config/config.env'});

const connectDB = require('./static/config/db');

connectDB();


const accountSchema2 = {
    username: String,
    password: String
}

const Account2 = mongoose.model("Account2", accountSchema2);


// Route files
const accounts = require('./static/routes/accounts');
const Account = require('./static/models/Account');
const { json } = require('express');

// Body parser
app.use(express.json());

// Mount routers
app.use('/api/accounts', accounts);

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    fs.readFile('register.html',(err, data)=>{
        if(err){
            res.writeHead(400);
            res.write('Error: File not Found');
          }else{
            res.write(data);
          }

          fs.readFile('./static/JS/registerScript',(err,data)=>{

          });
         
         
          res.end();
        });
     
        app.use(express.static(path.join(__dirname, 'static')));
    app.use("/static", express.static('./static/'));
    
});

app.get('/', (req, res) =>{
    res.writeHead(200,{'Content-Type': 'application/json'});
    
    fs.readFile('index.html',(err, data)=>{
        if(err){
            res.writeHead(400);
            res.write('Error: File not Found');
          }else{
            res.write(data);
          }

          fs.readFile('script.js',(err,data)=>{

          });
          
          res.end();
        });
  
        app.use(express.static(path.join(__dirname, 'static')));
    app.use("/static", express.static('./static/'));
    
});




// Register Account
app.post('/api/accounts', (req, res) => {
    console.log(req.body);    
let newAccount = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    
    newAccount.save();
    
    res.redirect('http://localhost:3000/static/login.html');
});

// Login Account
app.post('/api/accounts/auth', async(req, res) => {
    console.log(req.body);
    console.log('/auth')    

    let newAccount = new Account({
        username: req.body.username,
        password: req.body.password
      
    })
    console.log(newAccount);

    try{
        const accounts = await Account.find();
        let accFound = false; 

        for(let i = 0; i < accounts.length; i++){
            //console.log('name: ' + accounts[i].username,'pass: ' + accounts[i].password)
           
            if(accounts[i].username === req.body.username && 
                accounts[i].password === req.body.password){
                
                console.log('ACCOUNT Found')
                accFound = true;
                //console.log(accFound); 
           }     
        }
        console.log(accFound);
        if(accFound === true){
            
            res.redirect('http://localhost:3000/static/index.html')
        }else{
            //alert('Invalid data input');
            res.redirect('http://localhost:3000')
            //res.redirect('/api/accounts');
            console.log("ACCOUNT not found !");
            
        }
        
    }catch(err){
        
    }
    
    
  //  res.redirect('http://localhost:3000/static/login.html');
});


const server = app.listen(port);
const io = require('socket.io')(server);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);
    // close server & exit process
    server.close(() => process.exit(1));
})


const users = {};
io.on('connection', socket =>{
    
  socket.on('new-user', name =>{
    
    users[socket.id] = name;
    socket.broadcast.emit('User connected', name);
   // console.log(users[socket.id]);
});

    console.log('user connected');

     socket.on('send-chat-message', message =>{
        console.log(`${message}`);
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
        //console.log(users[socket.id] + ' sent the message');
 
    });

    socket.on('received-chat', message => {
        
        socket.broadcast.emit('received-chat', {message: message, name: users[socket.id]});
    });
    
    socket.on('disconnect', ()=>{
        console.log('User Disconnected');
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });

});



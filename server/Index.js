
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://Mani41:F0wVz7NyLb2FjCPX@cluster0.biczm.mongodb.net/user-auth?retryWrites=true&w=majority');

app.use(cors());
app.use(express.json());


app.post('/login', async ( req, res) => {
    
    
        const user = await User.findOne({
         
            email: req.body.email,
            password: req.body.password,
 
        })
   if(user) {   
       const token = jwt.sign({
           email: user.email,
           password: user.password
       }, 'secret123')

        res.json({status: 'Here is the user' , user: token})
    } else {
    
        res.json({status: 'error', error: 'user not found' , user: false})
    }
})


app.post('/register', async ( req, res) => {
    
    try {
        const user = await User.create({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmPassword
        })
        
        
    } catch (err) {
        console.log(err)
        res.json({status: 'error', error: 'not working'})
    }
})

app.get('/dashboard', async ( req, res) => {
    const token = req.headers('x-access-token')
  
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})
        return res.json({status: 'ok', quote: user.quote})
    } catch (error) {
        console.log(error)
        res.json({status: 'error', error: 'Invalid Token'})
    }
})

app.post('/dashboard', async ( req, res) => {
    const token = req.headers('x-access-token')
  
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.updateOne({email: email}, {$set: { quote: req.body.quote}})
        return res.json({status: 'ok'})
    } catch (error) {
        console.log(error)
        res.json({status: 'error', error: 'Invalid Token'})
    }
})

const port = 1337;

app.listen(port,() => {
    console.log(`The server is listening at port: ${port}`)
})


// var http = require('http');

// var httpServer = http.createServer((req, res) => {
//     res.write('hello world !')
//     res.end();
// })
// var port = 4000
// httpServer.listen(port, () => {
//     console.log(`The server is running on ${port} `);
// })
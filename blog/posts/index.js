const express = require('express');
// get the random generator 
const { randomBytes } = require('crypto');
// get body parser for post request 
const bodyParser =  require('body-parser');

// get the app 
const app     = express();

app.use(bodyParser.json());

// store post in object 
const posts = {};



app.get('/posts',(req,res)=>{

    res.send(posts);

});

app.post('/posts',(req,res)=>{
    // get unique id 
    const id = randomBytes(4).toString('hex');
    // get the string frombody 
    const { title } = req.body;
    // create a new post 
    posts[id] = {id,title};
    // send status 
    res.status(201).send(posts[id]);


});

app.listen(4000,()=>{
    console.log('Listening on 4000');
})
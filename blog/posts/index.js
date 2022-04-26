const express = require('express');
// get the random generator 
const { randomBytes } = require('crypto');
// get body parser for post request 
const bodyParser =  require('body-parser');

const cors = require('cors');

const axios = require('axios');

// get the app 
const app     = express();

app.use(bodyParser.json());
app.use(cors());

// store post in object 
const posts = {};



app.get('/posts',(req,res)=>{

    res.send(posts);

});

app.post('/posts', async (req,res)=>{
    // get unique id 
    const id = randomBytes(4).toString('hex');
    // get the string frombody 
    const { title } = req.body;
    // create a new post 
    posts[id] = {id,title};

    // send the event to the event bus 
    await axios.post('http://localhost:4005/events',{
        type:'PostCreated',
        data:{
            id,title
        }
    });

    console.log("Post recieved :: ")
    // send status 
    res.status(201).send(posts[id]);
});

app.post('/events',(req,res)=>{
    console.log('Receiving Event ', req.body.type);
    res.send({});
});

app.listen(4000,()=>{
    console.log('Listening on 4000');
})
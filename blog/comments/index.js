const express      =   require('express');
const bodyParser   =   require('body-parser');
const {randomBytes}=   require('crypto');
const { ppid } = require('process');

const  cors = require('cors');
const  axios = require('axios');

const app          =   express();
app.use(bodyParser.json());
app.use(cors());

// comment by post ID 
const commentsByPostId = {};

app.get('/posts/:id/comments', (req,res) =>{

   res.send(commentsByPostId[req.params.id] || []);

});


app.post('/posts/:id/comments',async (req,res) =>{

    const commentId = randomBytes(4).toString('hex');

    const {content} = req.body;

    // fetch existing comments from db and add the current comment;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id:commentId , content});
    
    commentsByPostId[req.params.id] =  comments;

    // adding post id to event 
    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id: commentId,
            content,
            postId:req.params.id
        }

    });

    res.status(201).send(comments);

});

app.post('/events',(req,res)=>{
    console.log('Receiving Event ', req.body.type);
    res.send({});
});

app.listen(4001,()=>{
    console.log('Listening on 4001');
});
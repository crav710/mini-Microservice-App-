const express      =   require('express');
const bodyParser   =   require('body-parser');
const {randomBytes}=   require('crypto');
const { ppid } = require('process');


const app          =   express();
app.use(bodyParser.json());


// comment by post ID 
const commentsByPostId = {};

app.get('/posts/:id/comments', (req,res) =>{

   res.send(commentsByPostId[req.params.id] || []);

});


app.post('/posts/:id/comments',(req,res) =>{

    const commentId = randomBytes(4).toString('hex');

    const {content} = req.body;

    // fetch existing comments from db and add the current comment;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id:commentId , content});
    
    commentsByPostId[req.params.id] =  comments;

    res.status(201).send(comments);

});


app.listen(4001,()=>{
    console.log('Listening on 4001');
});
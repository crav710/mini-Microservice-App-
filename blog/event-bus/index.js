const express    = require('express');
const bodyParser = require('body-parser');
const axios      = require('axios');

const app        = express();
app.use(bodyParser.json());


app.post('/events',(req,res)=>{
    // get the event 
    const event = req.body;

    // send post requests to all services 

    axios.post('http://localhost:4000/events',event).catch((err)=>{
        console.log(err.message);
    });
    axios.post('http://localhost:4001/events',event).catch((err)=>{
        console.log(err.message);
    });
    axios.post('http://localhost:4002/events',event).catch((err)=>{
        console.log(err.message);
    });

    res.send({status:'OK'});

});

app.listen(4005,()=>{
    console.log('Listening to 4005');
});
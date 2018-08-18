const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json({limit:'5mb'}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

app.get('/tes',(req,res)=>{
    res.send('hallo');
});


server.listen(port,()=>{
    console.log(`start pada port : ${port}`);
});
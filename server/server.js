const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const route=require('./route');
const cors= require('cors');

const port=3000;
app.use(cors());
app.use(bodyParser.json());
app.use('/api',route);


// app.get('/',(req,res)=>{
//     res.send('hello from server');
// })

app.listen(port,()=>{
    console.log('listening at port '+ port );
})
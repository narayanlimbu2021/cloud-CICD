const bodyParser = require('body-parser');
const express=require('express');
const {createQueue,createQueueUpdate1,createQueueUpdate,  createQueue1}=require('./clout-task');


const app=express();

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw({type: 'application/octet-stream'}));
// app.use(express.json())


app.get('/', async (req,res)=>{
    try{
       await createQueue();

       await createQueue1();
       await createQueueUpdate1();
       await createQueueUpdate();

       console.log('queue has been created')
       res.send('This is Home page from docker container')
    }catch(err){
        console.log('error--', err)
    }


})

app.post('/task', (req,res)=>{
    const {body}=req;
    const jsonString = Buffer.from(body, 'base64').toString('utf-8');
    const final=JSON.parse(jsonString)
    console.log('request received from gogle queue, converted from buffer',final)
    res.send('ok')
})

app.post('/task1', (req,res)=>{
    const {body}=req;
    console.log('request received from gogle queue task normal', body)
    res.send('ok')
})

app.patch('/task-update', (req,res)=>{
    const {body}= req;
    const jsonString = Buffer.from(body, 'base64').toString('utf-8');
    const final=JSON.parse(jsonString)
    console.log('request received from gogle queue task update buffer version', final)
    res.send('ok')
})

app.patch('/task-update1', (req,res)=>{
    const {body}= req;
    console.log('request received from gogle queue task update normal version', body)
    res.send('ok')
})

app.get('/testing',(req,res)=>{
    console.log('Test run successfully')
    res.send('Testing running successfully')
})
app.get('/timeout', (req,res)=>{
    setTimeout(()=>{
        console.log('Time out 10 second finished')
        res.send('Time out is finished')
    }, 10000);
})

app.get('/branch-test', (req,res)=>{
    res.send('This is from test branch 5 times ok')
})
app.listen(3000, ()=>{
    console.log(" app listening on port 3000");
})
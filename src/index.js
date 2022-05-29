const bodyParser = require('body-parser');
const express=require('express');
const {PubSub}=require('@google-cloud/pubsub');
const {createQueue,createQueueUpdate1,createQueueUpdate,  createQueue1}=require('./clout-task');


const app=express();

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw({type: 'application/octet-stream'}));
// app.use(express.json())

// pubSub

const pubsub=new PubSub();

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
    console.log('request received from google queue task update buffer version', final)
    res.send('ok')
})

app.patch('/task-update1', (req,res)=>{
    const {body}= req;
    console.log('request received from google queue task update normal version', body)
    res.send('ok')
})

app.get('/testing',(req,res)=>{
    console.log('Test run successfully added message')
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

// create pubsub

app.get('/create-pub-sub', async(req,res)=>{
    const topicName='projects/testing-app-344604/topics/Test-pubsub'
    const topic=pubsub.topic(topicName);
    const payload={'name': 'pubsub payload received'}
    const message=Buffer.from(JSON.stringify(payload), 'utf-8');

    await topic.publish(message);

    res.send('ok');
})

app.get('/pub-sub', (req, res)=>{
   
    console.log('This is pub sub testing api');
    res.send('pub sub api triggered');
})

app.listen(3000, ()=>{
    console.log(" app listening on port 3000");
})
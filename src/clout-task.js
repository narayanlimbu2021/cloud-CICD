const {CloudTasksClient} = require('@google-cloud/tasks');

const client = new CloudTasksClient();

const payload=JSON.stringify({name:'Test1', email:"test@gmail.com"})
const body=Buffer.from(payload).toString('base64');

console.log(body)

async function createQueue(){
    const queuePath='projects/testing-app-344604/locations/australia-southeast1/queues/testing'
    const task={
        httpRequest: {
            httpMethod: 'POST',
            url: 'https://app-1-jujn35s6jq-ts.a.run.app/task',
            body,
            headers:{
                'content-type': 'application/octet-stream',
            }
        },
    }


  
    const [response] = await client.createTask({parent:queuePath, task:task});
    console.log('task created', response);
}

async function createQueue1(){
    const queuePath='projects/testing-app-344604/locations/australia-southeast1/queues/testing'
    const payload=JSON.stringify({name:'Test1', email:"test@gmail.com"})
    const task={
        httpRequest: {
            httpMethod: 'POST',
            url: 'https://app-1-jujn35s6jq-ts.a.run.app/task1',
            body,
            headers:{
                'content-type': 'application/octet-stream',
            }

        },
    }
  

    const [response] = await client.createTask({parent:queuePath, task:task});
    console.log('task created', response);
}
async function createQueueUpdate(){
    const queuePath='projects/testing-app-344604/locations/australia-southeast1/queues/testing'
    const payload=JSON.stringify({name:'Test1', email:"test@gmail.com"})
    const task={
        httpRequest: {
            httpMethod: 'PATCH',
            url: 'https://app-1-jujn35s6jq-ts.a.run.app//task-update',
            body,
            headers:{
                'content-type': 'application/octet-stream',
            }
        },
    }
  

    const [response] = await client.createTask({parent:queuePath, task:task});
    console.log('task created', response);
}
async function createQueueUpdate1(){
    const queuePath='projects/testing-app-344604/locations/australia-southeast1/queues/testing'
    const payload=JSON.stringify({name:'Test1', email:"test@gmail.com"})
    const task={
        httpRequest: {
            httpMethod: 'PATCH',
            url: 'https://app-1-jujn35s6jq-ts.a.run.app//task-update1',
            body,
            headers:{
                'content-type': 'application/octet-stream',
            }
        },
    }
  

    const [response] = await client.createTask({parent:queuePath, task:task});
    console.log('task created', response);
}
module.exports={createQueue,  createQueue1, createQueueUpdate1, createQueueUpdate};

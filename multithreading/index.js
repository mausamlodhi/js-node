import express from "express";
import { Worker } from "worker_threads";
const app = express();
const  THREAD_COUNT = 4;
function createWorkers(){
    return new Promise((resolve,reject)=>{
        const worker = new Worker("./worker.js",{
            workerData:{
                THREAD_COUNT
            }
        })
        worker.on('message',(data)=>{
            resolve(data);
        });
        worker.on('error',(error)=>{
            reject(`An error occured ${error}`);
        })
    })
}
app.get('/non-blocking',(req,res)=>{
    res.status(200).send('This is a non-blocking request');
});

app.get('/blocking',async (req,res)=>{
    const workerPromises = [];
    for(let i=0;i<THREAD_COUNT;i++){
        workerPromises.push(createWorkers())
    };
    const threadResult = await Promise.all(workerPromises);
    const total = threadResult[0]+threadResult[1]+threadResult[2]+threadResult[3];
    res.status(200).send(`result is ${total}`);
});

app.listen(5050,(data)=>{
    console.log("Server started at port 5050")
})
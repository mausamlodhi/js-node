import { workerData, parentPort } from "worker_threads";

let counter = 0;
console.log("THREAD : ",workerData.THREAD_COUNT)
for(let i=0;i<20_000_000_000/workerData.THREAD_COUNT;i++){
    counter++;
};
parentPort.postMessage(counter);
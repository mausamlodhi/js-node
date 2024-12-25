import express from "express";
import os from "os";
import cluster from "cluster";

const app = express();
const cpus = os.cpus().length;
if (cluster.isPrimary) {
  console.log("xoxo0", cpus);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    if (signal) {
      console.log("Worker killed by a signal : ", signal);
    } else if (!code) {
      console.log("Worker exited with code : ", code);
    }
  });
} else {
  console.log("With clusterization");
  app.listen(5050, () => {
    console.log("Server running at ", 5050);
  });
}

const cluster = require("cluster");
const run = require("./app");
const totalCPUs = require("os").cpus().length;
 
if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}, Primary Worker is ${process.pid}.`);
 
  for (let i = 0; i < totalCPUs; i++) {
    let password = 'KIM v' + Math.floor(Math.random() * 10000)
    process.env.PASSWORD = password
    cluster.fork([{ env: process.env }])
  }
 
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork([{ env: process.env }])
  });

} else {
  run()
}
const express = require('express');
const cluster = require('cluster');
const os = require('os');

const cores = os.cpus().length;
// console.log("Number of cores running in this machine-", cores);
const app = express();


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


app.get('/', async (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        // console.log('forking')
    }
    res.send(`Success - sent by process - ${process.pid}`)
    cluster.worker.kill();
})


if (cluster.isMaster) {
    for (let i = 0; i < cores; i++) {
        // console.log('forking')
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        if (signal) {
            console.log(`worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`worker exited with error code: ${code}`);
        } else {
            cluster.fork()
            console.log(`worker ${worker.process.pid} died and new worker forked`);
        }
    })

} else {
    console.log('forked')
    app.listen(3000, () => {
        console.log(`App running in http://localhost:3000 and the process - ${process.pid}`)
    })
}


app.listen(3000, () => {
    console.log("App running in http://localhost:3000")
})
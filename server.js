const express = require('express');
const cluster = require('cluster');
const os = require('os');

const cores = os.cpus().length;
// console.log("Number of cores running in this machine-", cores);
const app = express();


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


app.get('/', async (req, res) => {
    for (let i = 0; i < 20e8; i++) {
        // console.log('forking')
    }
    // await sleep(10000);
    res.send(`Success - sent by process - ${process.pid}`)
    cluster.Worker.kill
})


if (cluster.isMaster) {
    for (let i = 0; i < cores; i++) {
        // console.log('forking')
        cluster.fork();
    }

} else {
    console.log('forked')
    app.listen(3000, () => {
        console.log(`App running in http://localhost:3000 and the process - ${process.pid}`)
    })
}


// app.listen(3000, () => {
//     console.log("App running in http://localhost:3000")
// })
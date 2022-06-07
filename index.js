 'use strict';

import process, { stderr, stdout } from "process";
import child_process, { exec } from "child_process";
import fs from "fs";


//console.log(process.argv);


// const message = 'Hello';
// process.stdout.write(message);


// setTimeout( () => {
//     process.stdout.write('Hello');
// },1000);

// let count = 0;
// setInterval( () => {
//     count ++;
//     if(count < 10){
//         process.exit();
//     }

// },100);


// exec('cat index.js', (err, stdout, stderr) => {
//     console.log('we got our catted file', stdout);
// })

// if(process.argv[2] === 'child'){
//     console.log('I am inside the child');
// }else{
//     const child = child_process.spawn(process.execPath, ['child'])
//     child.stdout.on('data', (data) => {
//         console.log('from child', data.toString());
//     })
// }


// if(process.argv[2] === 'child'){
//     console.log('I am inside the child');
// }else{
//     const child = child_process.spawn(process.execPath, ['child'], {
//         stdio:'inherit'
//     })
    
// }


var bears = 0

bears += 1

if (process.argv[2] === 'child') {
  var net = require('net')
  var pipe = new net.Socket({ fd: 3 })
  pipe.write('killme')
  //console.log('child', bears)
} else {
  var child = child_process.spawn(process.execPath, ['child'], {
    stdio: [null, null, null, 'pipe']
  })
  child.stdio[3].on('data', function (data) {
    if (data.toString() === 'killme') {
      console.log('RIP')
      child.kill()
    }
  })
  console.log('parent', bears)
  //child.stdout.pipe(process.stdout)
}
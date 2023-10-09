const fs = require('fs');
const file = require('./urls.json');

async function redirect() {
  let array = [];
  for (let ele of file) {
    let response = await fetch(ele["﻿url"]);
    response = await response.json();
    let obj = {
      url: ele["﻿url"],
      status: response.status,
      message: response.message,
    };
    array.push(obj);
    // console.log(array);
    // for single url check uncomment 'break'
    break; 
  }

  const csvFilePath = 'status.csv';
  const writeStream = fs.createWriteStream(csvFilePath);
  writeStream.write('URL,Status,Message\n');
  array.forEach((record) => {
    const line = `${record.url},${record.status},${record.message}\n`;
    writeStream.write(line);
  });
  writeStream.end();
  console.log(`CSV file '${csvFilePath}' has been created.`);
}
redirect();

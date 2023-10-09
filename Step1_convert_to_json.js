const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'urls.csv'; 
const jsonFilePath = 'urls.json'; 

const data = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('CSV to JSON conversion complete.');
  });

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, './usdaStatus.json');

const newObj = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
newObj.lastIdAdded += 1;

fs.writeFileSync(filePath, JSON.stringify(newObj));

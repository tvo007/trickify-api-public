const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '..', '..', '..', 'db', 'sources', 'scenes.csv'),
  'utf8'
);

const scenes = Papa.parse(csvData, {
  header: true,
});

module.exports = scenes.data.map(({ timestamp, tricks }) => ({
  timestamp,
  tricks,
}));
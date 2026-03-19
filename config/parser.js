const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: $0 -d <directory>')
  .option('d', {
    alias: 'directory',
    type: 'string',
    demandOption: true,
    describe: 'Directory to process',
  })
  .help()
  .argv;

const directory = argv.directory;
const files = fs.readdirSync(directory);

const parseFile = (file) => {
  const filePath = path.join(directory, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const config = {};

  lines.forEach((line) => {
    if (line.trim() !== '') {
      const [key, value] = line.trim().split(':');
      config[key.trim()] = value.trim();
    }
  });

  return config;
};

const parseDirectory = (directory) => {
  const files = fs.readdirSync(directory);

  const data = {};

  files.forEach((file) => {
    if (path.extname(file) === '.conf') {
      data[file] = parseFile(file);
    }
  });

  return data;
};

const data = parseDirectory(directory);

fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
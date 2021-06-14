const fs = require('fs');

const ejs = require('ejs');

const files = ['index', 'gardabateas'];

files.forEach(filename => {
  const content = fs.readFileSync(`./views/${filename}.ejs`, 'utf-8');

  fs.writeFileSync(
    `./public/${filename}.html`,
    ejs.render(content, { filename: `./views/${filename}.html` }),
    'utf-8'
  );
});

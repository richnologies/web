const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.enable('trust proxy');
app.set('view engine', 'ejs');

require('./server/routes')(app);
// require('./build/errors')(app);

app.listen(PORT, () => console.log('Listening on port', PORT));

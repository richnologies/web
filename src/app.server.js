var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

const PORT = process.env.PORT || 3000;

var app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.enable('trust proxy');
app.set('view engine', 'ejs');

require('./build/routes')(app);
// require('./build/errors')(app);

app.listen(PORT, () => console.log('Listening on port', PORT));

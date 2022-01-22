var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
var cors = require('cors')

const port = 3000

/*var corsOptions = {
    origin: 'https://paaassword.santhoshj.com',
    optionsSuccessStatus: 200 // For legacy browser support
}*/

var whitelist = ['http://password.santhoshj.com', 'https://password.santhoshj.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      //callback(new Error('Not allowed by CORS'))
      callback('Not allowed by CORS');
    }
  }
}

var app = express();

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Simple Password app listening at http://localhost:${port}`)
})

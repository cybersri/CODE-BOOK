const express = require('express');
const config = require('config');
const morgan = require('morgan');
const { MongoDB_Connection } = require('./database/database');

const PORT = config.get('PORT');
const app = express();
MongoDB_Connection();

app.use(morgan('dev'));
app.use(express.json());

app.use(require('./router/orgSignup'));
app.use(require('./router/login'));
app.use(require('./router/signup'));

app.listen(process.env.PORT || PORT, ()=> console.log(`Server running in PORT : ${PORT}`))
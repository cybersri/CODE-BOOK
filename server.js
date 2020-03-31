const express = require('express');
const config = require('config');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { MongoDB_Connection } = require('./database/database');
const { user } = require('./middleware/Auth');

const PORT = config.get('PORT');
const app = express();
MongoDB_Connection();

app.use(morgan('dev'));
app.use(express.json());
dotenv.config();

app.use(require('./router/orgSignup'));
app.use(require('./router/login'));
app.use(require('./router/signup'));
app.use(user);
app.use(require('./router/newsFeed'));
app.use(require('./router/mail'));
app.use(require('./router/post'));
app.use(require('./router/comment'));
app.use(require('./router/user'));
app.use(require('./router/suggestion'))

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server running in PORT : ${PORT}`)
);

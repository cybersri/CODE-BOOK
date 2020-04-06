const express = require('express');
const config = require('config');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoDB_Connection } = require('./database/database');
const { user } = require('./middleware/Auth');

const PORT = config.get('PORT');
const app = express();
MongoDB_Connection();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(require('./router/orgSignup'));
app.use(require('./router/login'));
app.use(require('./router/signup'));
app.use(require('./router/mail'));
app.use('/', (req, res)=> {
  res.send('knowlage book test app');
})
app.use(user);
app.use(require('./router/deleteAccount'));
app.use(require('./router/newsFeed'));
app.use(require('./router/post'));
app.use(require('./router/comment'));
app.use(require('./router/user'));
app.use(require('./router/profile'));
app.use(require('./router/suggestion'))
app.use(require('./router/upVote'))
app.use(require('./router/suggestionUpVote'))

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server running in PORT : ${PORT}`)
);

const express = require('express');
const config = require('config');
const morgan = require('morgan');

const PORT = config.get('PORT');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(require('./router/signup'));
app.use('/', (req, res)=> {
    res.send('hello world')
})

app.listen(process.env.PORT || PORT, ()=> console.log(`Server running in PORT : ${PORT}`))
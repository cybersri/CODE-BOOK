const express = require('express');
const config = require('config');
const morgan = require('morgan');

const PORT = config.get('PORT');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.listen(process.env.PORT || PORT, ()=> console.log(`Server running in PORT : ${PORT}`))
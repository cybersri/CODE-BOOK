const fs = require('fs');

fs.readFile('web-development.jpg', (err, data) => {
    if(err) {
         console.log(err);
    }
    console.log({data});
})
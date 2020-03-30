const bcrypt = require('bcrypt');

bcrypt.genSalt(10).then(salt => {
    console.log(salt);
}) 
const { verificationEmail } = require('./VerificationEmail')

verificationEmail(
    'Cyber Srikanth',
    'antony.raj@codingmart.com',
    'https://google.com'
).then(
    res=>console.log(res)
)

// console.log(a)
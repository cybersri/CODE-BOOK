const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const num = '0123456789'
const spl = '!@#$%^&*()-+=_<>?/'

const rand = [lower, upper, num, spl]

exports.passwordGen = (len)=>{

    let password = ''
    
    for (let i=0; i<len; i++){
        const selected = rand[Math.floor(Math.random()*4)]
        password = password+ selected[Math.floor(Math.random()*selected.length)]
    }
    
    return password
}
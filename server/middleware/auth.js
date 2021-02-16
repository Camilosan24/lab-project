const {User} = require('../models/user');

let auth = (req,res,next) => {
    let token = req.cookies.auth;
    console.log("cookie", req.cookies)
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        console.log('llega aqui 1')
        if(!user) return res.send(false);
        console.log('llega aqui 2')
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth}
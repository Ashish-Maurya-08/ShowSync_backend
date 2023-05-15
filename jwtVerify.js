const jwt = require('jsonwebtoken');
require("dotenv").config()
function verify (token){
    // verify jwt token
    try{
        const decoded = jwt.verify(token, process.env.secretOrKey);
        return decoded;
    }
    catch(err){
        return false;
    }
}

module.exports=verify;
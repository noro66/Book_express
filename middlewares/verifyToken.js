const jwt = require('jsonwebtoken');

function  verifyToken(req, res, next) {
    const token  = req.headers.token;
    if (token){
        try{
            req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        }catch (error){
            return res.status(401).json({message : "Invalid Token"})
        }
    }else  {
       return res.status(401).json({message : "No Token provided"})
    }
}

module.exports = verifyToken;
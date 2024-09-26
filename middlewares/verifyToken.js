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
function verifyTokenAndAuthorization(req, res, next){
    verifyToken(req, res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else {
            return res.status(403).json({message : "You are not allowed"})
        }
    })
}

function verifyTokenAndAdmin(req, res, next){
    verifyToken(req, res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else {
            return res.status(403).json({message : "You are not allowed Only Admin"})
        }
    })
}
module.exports = {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization};
import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).send('User is Unauthorized.');
    }
    jwt.verify(token, process.env.TOKENSECRET, (err, data) =>{
        if(err) return res.status(403).send('Invalid Token');
        req.userData = data;
        next();
    })
}

export {authenticateToken};
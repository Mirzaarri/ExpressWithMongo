const jwt = require('jsonwebtoken');

const authenticateWithToken = (req, res, next) => {
  try {
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    const token = req.header("Authorization").split(" ")[1];

  if(!token){
    return res.status(401).json({message: "Access Denied, token missing"})
  }

  jwt.verify(token, "8B196C12D3949FDB7BE7029DE4F16FAE", (err, user)=>{
    if(err){
      return res.status(403).json({message: "Invalid token"})
    }
    req.user = user;
    
    next();
  })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
  
}

module.exports = {authenticateWithToken}
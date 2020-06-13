const jwt = require('jsonwebtoken');

module.exports.auth = function(req,res,next) {
  const token = req.header("Authorization");

  if(token){
    const decoded = jwt.verify(token,process.env.secret);
    if(decoded){
      req.user = decoded;
      next();
    }else{
      re.status(401).json({msg:"token is not valid"});
      return;
    }
  }else{
    res.status(401).json({msg:"token not found"});
    return;
  }
}
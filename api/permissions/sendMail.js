const Role = require("../utils/role");


const onlyUserAccess = async (req, res, next) => {
  const currentUser = req.user
  const accessUser = req.params
  if(currentUser.id !== accessUser.userId || currentUser.role !== Role.Admin) {
    return res.status(401).json({ 
       message: 'Unauthorized',
       _help: "You cannot access this link at this time." 
    });
  }
  next();
}






module.exports = {
  onlyUserAccess
}
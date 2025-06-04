const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    console.log("No Authorization header found");
    return res.status(401).send({ message: "لا يوجد توكن، الوصول مرفوض" });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7, authHeader.length) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "توكن غير صالح" }); 
  }
};

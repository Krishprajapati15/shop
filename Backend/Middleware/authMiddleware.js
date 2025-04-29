import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("client token::",token);
    if (!token) {
      return res.status(401).json({ status:false,message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log("token decoded::",decoded);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json({ status:false,message: 'token Invalid' });
    }
  };

  export default authMiddleware;
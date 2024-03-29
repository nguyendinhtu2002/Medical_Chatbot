import jwt from "jsonwebtoken";
import User from "../models/UsersModel.js";
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 1221212121);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      return  res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized as an Admin" });
  }
};
export { protect, admin };
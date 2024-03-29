import jwt from "jsonwebtoken";

const generateToken = async (id) => {
  return jwt.sign({ ...id }, process.env.JWT_SECRET, {
    expiresIn: "30s",
  });
};
const refreshToken = async (id) => {
  return jwt.sign({ ...id }, process.env.REFRESH_TOKEN_SECRET);
};
export { generateToken, refreshToken };
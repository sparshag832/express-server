import * as userModel from "../models/userModel.js";
import * as bcrypt from "../utils/common/src.js";
import * as jwt from "../utils/jwt.js";
export const login = async (email, password) => {
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) throw new Error("Invalid User");
    const isValidPass = await bcrypt.verifyPassword(password, user.password);
    if (!isValidPass) throw new Error("Invalid Password");
    const payload = { username: user.username, id: user.id };
    const authToken = jwt.generateToken(payload, "15m");
    return { authToken: authToken, userId: user.id };
  } catch (err) {
    console.log("Error Occured In User Login", err.message);
    throw new Error(err);
  }
};

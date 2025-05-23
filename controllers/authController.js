import * as authService from "../services/authService.js";
import verifyRecaptcha from "../utils/recaptcha.js";
export const login = async (req, res) => {
  const { email, password, token } = req.body;
  if (!email || !password) {
    return res.status(400).render("login", {
      error: "All fields are required.",
      success: "",
    });
    // throw new Error("All Fields Required");
  }

  const isHuman = await verifyRecaptcha(token);
  if (!isHuman) {
    return res.status(400).render("login", {
      error: "Invalid reCAPTCHA. Please try again.",
      success: "",
    });
  }

  try {
    const result = await authService.login(email, password);
    res.cookie("token", result.authToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200);
    res.redirect(`/user/get/${result.userId}`);
    // res.send({ message: "User Logged In Succesfully", data: result });
  } catch (err) {
    console.log("Some Error Occured", err.message);
    return res.status(400).render("login", {
      error: err.message,
      success: "",
    });
    // res.status(400).send(`Some Error Occured ${err.message}`);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    // res.send({message:"Logged Out Succesfully"})
    res.redirect('/auth/login'); 
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send({
      message: "Something went wrong, please try again."
    });
  }
};

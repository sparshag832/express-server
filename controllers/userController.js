import * as userService from "../services/userService.js";
import { hashPassword } from "../utils/common/src.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      // throw new Error("All Fields Are Required");
    res.status(400).render('register',{
      error:"All Fields Are Required",
      success:""
    })
    const hashedPassword = await hashPassword(password);
    const result = await userService.createUser(
      username,
      email,
      hashedPassword
    );
    res.status(201).redirect(`/user/get/${result.id}`)
    // res.send({
    //   message: "User Created Succesfully",
    //   data: result,
    // });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(400).send({ message: `Some Error Occured: ${err.message}` });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUser(id);
    // res.send({ data: user });
    res.status(200).render('profile',{
      user,
      error:"",
      success:"Logged In Succesfully"
    })
  } catch (err) {
    console.log("Error Occured :", err.message);
    res.status(400).render('profile',{
      error:err.message,
      success:""
    })
    // res.status(400).send(`Some Error Occured ${err.message}`);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
  
    console.log("Fetched Users: ", users);
  
    res.status(200).render('list', {
      users: users, 
      success: "List Fetched Successfully" 
    });
  } catch (err) {
    console.log("Error Occurred: ", err.message);
    res.status(400).send(`Some Error Occurred: ${err.message}`);
  }
};


export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    res.send({
      message: "User Deleted Succesfully",
      data: result,
    });
  } catch (err) {
    console.log("Error Occured", err.message);
    res.status(400).send(`Some Error Occured ${err.message}`);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  try {
    const result = await userService.updateUser(id, user);
    res.send({
      message: "User Updated Succesfully",
      data: result,
    });
  } catch (err) {
    console.log("Error Occured", err.message);
    res.status(400).send(`Some Error Occured ${err.message}`);
  }
};

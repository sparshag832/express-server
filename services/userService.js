import * as userRepository from "../models/userModel.js";

export const createUser = async (username, email, password) => {
  try {
    const user = await userRepository.createUser(username, email, password);
    return user;
  } catch (err) {
    console.log("Error While Creating User", err.message);
    throw new Error(err.message);
  }
};

export const getUser = async (id) => {
  try {
    const user = await userRepository.getUserById(id);
    if(user==null)
    throw new Error("User Does Not Exist")
    console.log(user)
    return user;
  } catch (err) {
    console.log("Error Occured During User Get", err.message);
    throw new Error(err.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const isExist = await userRepository.getUserById(id);
    if (!isExist) {
      throw new Error("User not found");
    }
    const user = await userRepository.deleteUser(id);
    return user;
  } catch (err) {
    console.log("Error Occured In User Deletion", err.message);
    throw new Error(err.message);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await userRepository.getAllUsers();
    return users;
  } catch (err) {
    console.log("Error Occured In Users Get All ", err.message);
    throw new Error(err.message);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const isExist = await userRepository.getUserById(id);
    if (!isExist) {
      throw new Error("User not found");
    }

    const fieldsToUpdate = {};

    if (userData.username) {
      fieldsToUpdate.username = userData.username;
    }
    if (userData.email) {
      fieldsToUpdate.email = userData.email;
    }
    if (userData.password) {
      fieldsToUpdate.password = userData.password;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return null;
    }

    const updatedUser = await userRepository.updateUser(id, fieldsToUpdate);
    return updatedUser;
  } catch (err) {
    console.error("Error in service layer:", err.message);
    throw new Error(err.message);
  }
};

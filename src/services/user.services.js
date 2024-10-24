import { userModel } from "../daos/mongodb/models/user.model.js";
import { generateUser } from "../utils/user.utils.js";

export const createUsersMock = async (cant = 20) => {
  try {
    const usersArray = [];
    for (let i = 0; i < cant; i++) {
      const user = generateUser()
      usersArray.push(user);
    }
    return await userModel.insertMany(usersArray);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsers = async () => {    
    try {
      return await userDao.getUsers();
    } catch (error) {
      console.log (error);
    }
};

export const createUser = async (user) => {
  try {
    return await userDao.createUser(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getUserByEmail(email);
  } catch (error) {
    console.log(error);
  }
}
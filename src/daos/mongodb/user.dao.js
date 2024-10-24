import { userModel } from "./models/user.model.js";

export default class UserDao {
  async getUsers() {
    try {
      return await userModel.find({});
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      return await userModel.create(user);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await userModel.find({ email });
    } catch (error) {
      console.error("Error al obtener el usuario por email:", error);
      throw error;
    }
  }
}

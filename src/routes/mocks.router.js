import { Router } from "express";
import { generateMockUsers, generateMockCart } from "../utils/mock.utils.js";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { CartModel } from "../daos/mongodb/models/cart.model.js";
import bcrypt from "bcrypt";

const router = Router();


router.get("/mockingusers", async (req, res) => {
    try {
        const mockUsers = generateMockUsers(50);
        res.status(200).json(mockUsers);
    } catch (error) {
        res.status(500).json({ message: "Error al generar usuarios mock", details: error.message });
    }
});

router.post("/generateData", async (req, res) => {
    try {
        const { users = 0, carts = 0 } = req.body;

        const mockUsers = generateMockUsers(users);
        for (let user of mockUsers) {
            user.password = await bcrypt.hash("coder123", 10);
            await userModel.create(user);
        }

        const mockCarts = generateMockCart(carts);
        await CartModel.insertMany(mockCarts);

        res.status(201).json({ message: "Datos generados exitosamente", users: mockUsers.length, carts: mockCarts.length });
    } catch (error) {
        res.status(500).json({ message: "Error al generar datos", details: error.message });
    }
});


router.get("/users", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", details: error.message });
    }
});

export default router;


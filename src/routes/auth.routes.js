import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";
import { createHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";
import { mailService } from "../services/mail.services.js";

const router = Router();

router.post("/login",
    validate(authDto),

    passport.authenticate("login", {
        session: false,
        failureRedirect: "/api/auth/login-error",
    }),

    async (req, res) => {
        try {
            const payload = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email,
                role: req.user.role,
            };

            const token = generateToken(payload);

            res.cookie("token", token, { 
                httpOnly: true, 
                maxAge: 100000 }
            );

            res.status(200).json({
                message: "Autenticado",
                token,
            });
        } catch (error) {
            res
            .status(500)
            .json({ error: "Error al iniciar sesión", details: error.message });
        }
    }
);

router.get('/login-error', (req, res) => {
    res.status(401).json({ message: "No autorizado" });
});

router.post("/register", 

    validate(userDto),
    
    async (req, res) => {
        const { first_name, last_name, email, age, role, password, cart } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        try {
            const hashPassword = await createHash(password);

            const user = await userModel.create({
                first_name,
                last_name,
                email,
                age,
                password: hashPassword,
                role,
                cart,
            });

            // Enviar mail de bienvenida
            await mailService.sendMail({
                to: email,
                subject: "Bienvenido a nuestro servicio de mensajes masivos",
                type: "welcome",
            });

            res.status(201).json(user);

        } catch (error) {
            res.status(500).json({ message: "Error al registrar usuario", details: error.message });
        }
});

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        res.status(200).json({
            message: "Bienvenido",
            user: resUserDto(req.user)
        });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Error al obtener el usuario", details: error.message });
    }
});

export default router;
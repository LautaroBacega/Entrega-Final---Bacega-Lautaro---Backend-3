import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
import { validate } from "../middlewares/validation.middleware.js";
import { cartDto } from "../dtos/cart.dto.js";
import passport from "passport";
import { authorizations } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/", controller.getAll); 

router.get("/:id", controller.getById); 

router.post("/", passport.authenticate('jwt', {session: false}), validate(cartDto), controller.create); 

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

router.post("/:idCart/products/:idProd", passport.authenticate('jwt', {session: false}), authorizations(["user"]), controller.addProdToCart);

router.delete("/:idCart/products/:idProd", passport.authenticate('jwt', {session: false}), authorizations(["user"]), controller.removeProdToCart);

router.put("/:idCart/products/:idProd", passport.authenticate('jwt', {session: false}), authorizations(["user"]), controller.updateProdQuantityToCart);

router.delete("/clear/:idCart", passport.authenticate('jwt', {session: false}), authorizations(["user"]), controller.clearCart);

router.post("/:id/purchase", passport.authenticate('jwt', {session: false}), authorizations(["user"]), controller.finalizarCompra);

export default router;

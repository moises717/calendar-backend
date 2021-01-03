/* 

Rutas de Usuario / auth 
Host + api/auht

*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const router = Router();

router.post(
	"/new",
	[
		check("name", "El nombre es obligatorio.").not().isEmpty(),
		check("email", "El email es obligatorio.").isEmail(),
		check(
			"password",
			"El password debe ser mayor o igual a 6 caracteres."
		).isLength({ min: 6 }),
		validarCampos,
	],
	crearUsuario
);

router.post(
	"/",
	[
		check("email", "El email es requerido").isEmail(),
		check("password", "El password es requerido").isLength({ min: 6 }),
		validarCampos,
	],

	loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;

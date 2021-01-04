/*

Events route

/api/events

*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
	getEventos,
	crearEventos,
	actualizaEventos,
	eliminarEventos,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.use(validarJWT);
//Obtener eventos
router.get("/", getEventos);
//Crear eventos
router.post(
	"/",
	[
		check("title", "El titulo es obligtorio.").not().isEmpty(),
		check("start", "Fecha de inicio es obligatoria.").custom(isDate),
		check("end", "Fecha de finalizacion es obligatoria.").custom(isDate),
		validarCampos,
	],
	crearEventos
);
//aactualizar evento
router.put(
	"/:id",
	check("title", "El titulo es obligtorio.").not().isEmpty(),
	check("start", "Fecha de inicio es obligatoria.").custom(isDate),
	check("end", "Fecha de finalizacion es obligatoria.").custom(isDate),
	validarCampos,
	actualizaEventos
);
//Borrar evento
router.delete("/:id", eliminarEventos);

module.exports = router;

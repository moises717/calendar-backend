const { response } = require("express");
const { verify } = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
	//  x-token headers
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No hay token en la peticion.",
		});
	}

	try {
		const { uid, name } = verify(token, process.env.SECRET_JSON_SEED);

		req.uid = uid;
		req.name = name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "Token no valido.",
		});
	}

	next();
};

module.exports = {
	validarJWT,
};

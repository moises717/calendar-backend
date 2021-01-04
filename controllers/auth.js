const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
	const { email, password } = req.body;

	try {
		let usuarioExists = await Usuario.findOne({ email });

		if (usuarioExists) {
			return res.status(400).json({
				ok: false,
				msg: "El correo ya existe.",
			});
		}

		const usuario = new Usuario(req.body);

		//Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		// Generar json web token

		const token = await generarJWT(usuario.id, usuario.name);

		return res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Porfavor hable con el administrador.",
		});
	}
};

const loginUsuario = async (req, res) => {
	const { email, password } = req.body;

	try {
		let usuarioExists = await Usuario.findOne({ email });

		if (!usuarioExists) {
			return res.status(400).json({
				ok: false,
				msg: "El usuario no existe con ese email.",
			});
		}

		//Confirmar las contraseñas

		const validPassword = bcrypt.compareSync(password, usuarioExists.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Datos incorrectos.",
			});
		}

		// Generar json web token

		const token = await generarJWT(usuarioExists.id, usuarioExists.name);

		res.json({
			ok: true,
			uid: usuarioExists.id,
			name: usuarioExists.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Porfavor hable con el administrador.",
		});
	}
};

const revalidarToken = async (req, res) => {
	const { uid, name } = req;
	
	

	// generar un nuevo token

	const token = await generarJWT(uid, name);

	res.json({
		ok: true,
		token,
		uid,
		name
	});
};

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};

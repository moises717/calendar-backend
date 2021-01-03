const Evento = require("../models/Evento");

const getEventos = async (req, res) => {
	const eventos = await Evento.find().populate("user", "name");

	res.json({
		ok: true,
		eventos,
	});
};
const crearEventos = async (req, res) => {
	const evento = new Evento(req.body);
	try {
		evento.user = req.uid;

		const eventSaved = await evento.save();
		res.json({
			ok: true,
			evento: eventSaved,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactarse con el administrador",
		});
	}
};
const actualizaEventos = async (req, res) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventId);

		if (!evento) {
			res.status(404).json({
				ok: false,
				msg: "El evento no existe por ese id",
			});
		}

		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "No tiene privilegio de editar este evento.",
			});
		}

		const newEvent = {
			...req.body,
			user: uid,
		};

		const eventoAc = await Evento.findByIdAndUpdate(eventId, newEvent, {
			new: true,
		});

		res.json({
			ok: true,
			evento: eventoAc,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};
const eliminarEventos = async (req, res) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const evento = await Evento.findById(eventId);

		if (!evento) {
			res.status(404).json({
				ok: false,
				msg: "El evento no existe por ese id",
			});
		}

		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "No tiene privilegio de eliminar este evento.",
			});
		}

		await Evento.findByIdAndDelete(eventId);

		res.json({
			ok: true,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

module.exports = {
	getEventos,
	crearEventos,
	actualizaEventos,
	eliminarEventos,
};

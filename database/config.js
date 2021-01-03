const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("Conectado a la base de datos.");
	} catch (err) {
		console.log(err);
		throw new Error("Error al conectar a la base de datos.");
	}
};

module.exports = dbConnection;

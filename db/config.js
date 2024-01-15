const mongoose = require("mongoose");

const conexion = async() => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("conectado con exito a la base de datos");
    } catch (error) {
        console.log(error);
        throw new Error("error al conectar a la base de datos, contacta admin");
    }
}

module.exports = conexion;
const { Schema, model } = require("mongoose");

const MotoSchema = new Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    cilindrada: {
        type: Number,
        required: true
    },
    placa: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },
})

module.exports = model("Moto", MotoSchema)
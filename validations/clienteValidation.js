const { check } = require("express-validator");

const clienteValidation = [
    check("nombres", "el nombre es obligatorio").notEmpty(),
    check("nombres", "nombre no valido").isLength({ min: 1, max: 50 }),
    check("apellidos", "el apellido es obligatorio").notEmpty(),
    check("apellidos", "apellido no valido").isLength({ min: 1, max: 50 }),
    check("direccion", "la direccion es obligatoria").notEmpty(),
    check("direccion", "direccion no valida").isLength({ min: 5, max: 100 }),
    check("email", "email no valido").isEmail(),
    check("telefono", "telefono no valido").isNumeric().isLength(10),
    check("whatsapp", "whatsapp no valido").isNumeric().isLength(10)
]

module.exports = clienteValidation
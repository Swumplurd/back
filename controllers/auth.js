const generarJWT = require("../helpers/jwt");

const getToken = async (req, res) => {
    try {
        const token = await generarJWT("1", "Fernando");

        res.json({
            ok: true,
            msg: "token generado con exito",
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

module.exports = {getToken}
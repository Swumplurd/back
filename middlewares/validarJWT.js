const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
    const token = req.header("x-token")

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "no hay token en la peticion"
        })
    }

    try {
        jwt.verify(token, process.env.JWTSEED)
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: "token no valido"
        })
    }

    next()
}

module.exports = validarJWT
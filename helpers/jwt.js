const jwt = require("jsonwebtoken")

const generarJWT = (id, nombre) => {
    return new Promise((resolve, reject) => {
        const payload = {id, nombre}

        jwt.sign(payload, process.env.JWTSEED, {
            expiresIn: "2h"
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject("no se pudo construir el token")
            }

            resolve(token)
        })
    })
}

module.exports = generarJWT
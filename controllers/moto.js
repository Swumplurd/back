const Moto = require("../models/Moto");

const getMotos = async(req, res) => {
    try {
        const motos = await Moto.find({}).populate("cliente", "nombres apellidos email");

        if (motos.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "no hay motos en la base de datos"
            })
        }

        res.json({
            ok: true,
            data: motos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const postMoto = async(req, res) => {
    try {
        const moto = req.body;

        const nuevaMoto = new Moto(moto)
        await nuevaMoto.save();

        res.json({
            ok: true,
            msg: "moto insertada en la base de datos"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const putMoto = async(req, res) => {
    try {
        const motoId = req.params.id;
        const moto = await Moto.findById(motoId);

        if (!moto) {
            return res.status(404).json({
                ok: false,
                msg: "no existe una moto con ese id"
            });
        }

        const motoActualizada = await Moto.findByIdAndUpdate(motoId, req.body);

        res.json({
            ok: true,
            msg: "Moto actualizada con exito",
            data: motoActualizada,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const deleteMoto = async(req, res) => {
    try {
        const motoId = req.params.id;
        const moto = await Moto.findById(motoId);

        if (!moto) {
            return res.status(404).json({
                ok: false,
                msg: "no existe una moto con ese id"
            });
        }

        const motoEliminada = await Moto.findByIdAndDelete(motoId);

        res.json({
            ok: true,
            msg: "moto eliminada con exito",
            data: motoEliminada,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const getMotoById = async(req, res) => {
    try {
        const moto = await Moto.findById(req.params.id);

        if (!moto) {
            return res.status(404).json({
                ok: false,
                msg: "no existe moto con ese id"
            })
        }

        res.json({
            ok: true,
            msg: "moto obtenida con exito",
            data: moto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const getMotosByCliente = async(req, res) => {
    try {
        const motos = await Moto.find({cliente: req.params.cliente})

        if (motos.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "no se encontraron motos del cliente"
            })
        }

        res.json({
            ok: true,
            msg: "motos obtenidas con exito",
            data: motos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

module.exports = {
    getMotos,
    postMoto,
    putMoto,
    deleteMoto,
    getMotosByCliente,
    getMotoById
}
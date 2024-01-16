const Cliente = require("../models/Cliente");
const Moto = require("../models/Moto");
const Servicio = require("../models/Servicio");

const getServicios = async(req, res) => {
    try {
        const servicios = await Servicio.find({})

        if (servicios.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "no hay servicios en la base de datos"
            })
        }

        res.json({
            ok: true,
            data: servicios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const postServicio = async(req, res) => {
    try {
        const servicio = req.body;

        const nuevoServicio = new Servicio(servicio)
        await nuevoServicio.save();

        res.json({
            ok: true,
            msg: "servicio insertado en la base de datos"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const postServicioCompleto = async(req, res) => {
    try {
        const servicioCompleto = req.body;

        const cliente = {
            nombres: servicioCompleto.nombres,
            apellidos: servicioCompleto.apellidos,
            direccion: servicioCompleto.direccion,
            email: servicioCompleto.email,
            telefono: servicioCompleto.telefono,
            whatsapp: servicioCompleto.whatsapp,
        }

        const nuevoCliente = new Cliente(cliente);
        await nuevoCliente.save();

        const moto = {
            marca: servicioCompleto.marca,
            modelo: servicioCompleto.modelo,
            cilindrada: servicioCompleto.cilindrada,
            placa: servicioCompleto.placa,
            color: servicioCompleto.color,
            tipo: servicioCompleto.tipo,
            cliente: nuevoCliente._id,
        }

        const nuevaMoto = new Moto(moto);
        await nuevaMoto.save()

        const servicio = {
            fecha: servicioCompleto.fecha,
            anticipo: servicioCompleto.anticipo,
            presupuesto: servicioCompleto.presupuesto,
            kilometraje: servicioCompleto.kilometraje,
            combustible: servicioCompleto.combustible,
            concepto: servicioCompleto.concepto,
            observaciones: servicioCompleto.observaciones,
            proximo: servicioCompleto.proximo,
            moto: nuevaMoto._id,
        }

        const nuevoServicio = new Servicio(servicio);
        await nuevoServicio.save();

        res.json({
            ok: true,
            msg: "cliente, moto y servicio guardados con exito"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const postServicioConClienteExistente = async(req, res) => {
    try {
        const servicioConClienteExistente = req.body

        const moto = {
            marca: servicioConClienteExistente.marca,
            modelo: servicioConClienteExistente.modelo,
            cilindrada: servicioConClienteExistente.cilindrada,
            placa: servicioConClienteExistente.placa,
            color: servicioConClienteExistente.color,
            tipo: servicioConClienteExistente.tipo,
            cliente: servicioConClienteExistente.cliente,
        }

        const nuevaMoto = new Moto(moto);
        await nuevaMoto.save()

        const servicio = {
            fecha: servicioConClienteExistente.fecha,
            anticipo: servicioConClienteExistente.anticipo,
            presupuesto: servicioConClienteExistente.presupuesto,
            kilometraje: servicioConClienteExistente.kilometraje,
            combustible: servicioConClienteExistente.combustible,
            concepto: servicioConClienteExistente.concepto,
            observaciones: servicioConClienteExistente.observaciones,
            proximo: servicioConClienteExistente.proximo,
            moto: nuevaMoto._id,
        }

        const nuevoServicio = new Servicio(servicio);
        await nuevoServicio.save();

        res.json({
            ok: true,
            msg: "moto y servicio guardados con exito"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const postServicioConClienteMotoExistente = async(req, res) => {
    try {
        const servicioConClienteMotoExistente = req.body;

        const servicio = {
            fecha: servicioConClienteMotoExistente.fecha,
            anticipo: servicioConClienteMotoExistente.anticipo,
            presupuesto: servicioConClienteMotoExistente.presupuesto,
            kilometraje: servicioConClienteMotoExistente.kilometraje,
            combustible: servicioConClienteMotoExistente.combustible,
            concepto: servicioConClienteMotoExistente.concepto,
            observaciones: servicioConClienteMotoExistente.observaciones,
            proximo: servicioConClienteMotoExistente.proximo,
            moto: servicioConClienteMotoExistente.moto,
        }

        const nuevoServicio = new Servicio(servicio);
        await nuevoServicio.save();

        res.json({
            ok: true,
            msg: "servicio guardado con exito"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const putServicio = async(req, res) => {
    try {
        const servicioId = req.params.id;
        const servicio = await Servicio.findById(servicioId);

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                msg: "no existe un servicio con ese id"
            });
        }

        const servicioActualizado = await Servicio.findByIdAndUpdate(servicioId, req.body);

        res.json({
            ok: true,
            msg: "servicio actualizado con exito",
            data: servicioActualizado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const deleteServicio = async(req, res) => {
    try {
        const servicioId = req.params.id;
        const servicio = await Servicio.findById(servicioId);

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                msg: "no existe un servicio con ese id"
            });
        }

        const servicioEliminado = await Servicio.findByIdAndDelete(servicioId);

        res.json({
            ok: true,
            msg: "servicio eliminado con exito",
            data: servicioEliminado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const getServicioById = async(req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                msg: "no existe servicio con ese id"
            })
        }

        res.json({
            ok: true,
            msg: "servicio obtenida con exito",
            data: servicio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const getProximosServicios = async(req, res) => {
    try {
        const proximosServicios = await Servicio.find({
            proximo: {
                $gte: `${new Date().toISOString}`
            }
        }).sort({
            proximo: "asc"
        })

        if (proximosServicios.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "no hay proximos servicios"
            })
        }

        res.json({
            ok: true,
            msg: "servicios obtenidos con exito",
            data: proximosServicios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const getServiciosByMotoId = async(req, res) => {
    try {
        const motoId = req.params.motoid;
        const moto = await Moto.findById(motoId);

        if (!moto) {
            return res.status(404).json({
                ok: false,
                msg: "no existe moto con ese id"
            })
        }

        const servicios = await Servicio.find({moto: motoId})

        if (servicios.length === 0) {
            return res.stauts(404).json({
                ok: false,
                msg: "esta moto no tiene servicios"
            })
        }

        res.json({
            ok: true,
            msg: "servicios obtenidos con exito",
            data: servicios
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
    getServicios,
    postServicio,
    putServicio,
    deleteServicio,
    getServicioById,
    postServicioCompleto,
    postServicioConClienteExistente,
    postServicioConClienteMotoExistente,
    getProximosServicios
}
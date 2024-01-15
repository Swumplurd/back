const Cliente = require("../models/Cliente");

const getClientes = async(req, res) => {
    try {
        const clientes = await Cliente.find({});

        if (clientes.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "no hay clientes en la base de datos"
            })
        }

        res.json({
            ok: true,
            data: clientes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const postCliente = async(req, res) => {
    try {
        const cliente = req.body;

        const nuevoCliente = new Cliente(cliente)
        await nuevoCliente.save();

        res.json({
            ok: true,
            msg: "cliente insertado en la base de datos"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const putCliente = async(req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findById(clienteId);

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: "no existe un cliente con ese id"
            });
        }

        const clienteActualizado = await Cliente.findByIdAndUpdate(clienteId, req.body);

        res.json({
            ok: true,
            msg: "cliente actualizado con exito",
            data: clienteActualizado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const deleteCliente = async(req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findById(clienteId);

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: "no existe un cliente con ese id"
            });
        }

        const clienteEliminado = await Cliente.findByIdAndDelete(clienteId);

        res.json({
            ok: true,
            msg: "cliente eliminado con exito",
            data: clienteEliminado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const getClienteById = async(req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: "no existe cliente con ese id"
            })
        }

        res.json({
            ok: true,
            msg: "cliente obtenido con exito",
            data: cliente
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en el servidor, contacta con el admin"
        })
    }
}

const getClientesByName = async(req, res) => {
    try {
        const clientes = await Cliente.find({
            nombres: {
                "$regex": req.params.nombre,
                "$options": "i"
            }
        })

        if (clientes.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "no se encontraron clientes con ese nombre"
            })
        }

        res.json({
            ok: true,
            msg: "clientes obtenidos con exito",
            data: clientes
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
    getClientes,
    postCliente,
    putCliente,
    deleteCliente,
    getClientesByName,
    getClienteById
}
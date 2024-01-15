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
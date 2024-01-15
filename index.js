require("dotenv").config();
const express = require("express");
const conexion = require("./db/config");

const app = express();
conexion();

app.use(express.json());

app.use("/api/clientes", require("./routes/cliente"));

app.listen(process.env.PORT,() => {
    console.log(`app corriendo en http://localhost:${process.env.PORT}`)
});
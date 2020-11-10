const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const Hospital = require('../models/hospitalModel');

const getHospitales = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [hospitales, total] = await Promise.all([
        Hospital.find({}, 'nombre direccion nivel').skip(desde).limit(limite),
        Hospital.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'obtener hospitales',
        hospitales,
        total
    });
}
const crearHospital = async(req, res = response) => {
    const { nombre } = req.body;

    try {
        const existeNombre = await Hospital.findOne({ nombre });

        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'El hospital ya esta registrado  '
            });
        }
        const hospital = new Hospital(req.body);
        await hospital.save();
        //Generar el TOKEN
        const token = await generateJWT(hospital.id);

        res.json({
            ok: true,
            msg: 'Creando hospital',
            hospital,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });

    }
}

const actualizarHospital = async(req, res = response) => {

    const uid = req.params.id;


    try {
        const hospitalDB = await Hospital.findById(uid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital no ese nombre'
            });
        }
        //Actualizaciones
        const { nombre, direccion, nivel } = req.body;

        if (hospitalDB.nombre != nombre) {

            const existeNombre = await Hospital.findOne({ nombre });
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un hospital con ese nombre'
                });
            }
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(uid, { new: true });


        res.json({
            ok: true,
            hospital: hospitalActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });
    }

}
const eliminarHospital = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(uid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese nombre'
            });
        }
        await Hospital.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Error en eliminar hospital, comunicar al dba'
        });
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital,


}
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const Doctor = require('../models/doctorModel');

const getDoctores = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [doctores, total] = await Promise.all([
        Doctor.find({}, 'nombre edad dni').skip(desde).limit(limite),
        Doctor.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'obtener doctores',
        doctores,
        total
    });
}
const crearDoctor = async(req, res = response) => {
    const { dni } = req.body;

    try {
        const existeDni = await Doctor.findOne({ dni });

        if (existeDni) {
            return res.status(400).json({
                ok: false,
                msg: 'El dni ya esta registrado  '
            });
        }
        const doctor = new Doctor(req.body);
        await doctor.save();
        //Generar el TOKEN
        const token = await generateJWT(doctor.id);

        res.json({
            ok: true,
            msg: 'Creando doctor',
            doctor,
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

const actualizarDoctor = async(req, res = response) => {

    const uid = req.params.id;


    try {
        const doctorDB = await Doctor.findById(uid);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un doctor con este id'
            });
        }
        //Actualizaciones
        const { nombre, edad, dni } = req.body;

        if (doctorDB.dni != dni) {

            const existeDni = await Doctor.findOne({ dni });
            if (existeDni) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un doctor con ese dni'
                });
            }
        }

        const doctorActualizado = await Doctor.findByIdAndUpdate(uid, { new: true });


        res.json({
            ok: true,
            doctor: doctorActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });
    }

}
const eliminarDoctor = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const doctorDB = await Doctor.findById(uid);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un doctor con este id'
            });
        }
        await Doctor.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Doctor eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Error en eliminar doctor, comunicar al dba'
        });
    }

}

module.exports = {
    getDoctores,
    crearDoctor,
    actualizarDoctor,
    eliminarDoctor,

}
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitalesController');
const { validarJWT } = require('../midlewares/validarJWT');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        check('nivel', 'El nivel es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    crearHospital);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        check('nivel', 'El nivel es obligatoria').not().isEmpty(),
        validarCampos,

    ],
    actualizarHospital);

router.delete('/:id', validarJWT, eliminarHospital);

module.exports = router; //para exportar
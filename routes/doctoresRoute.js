const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { getDoctores, crearDoctor, actualizarDoctor, eliminarDoctor } = require('../controllers/doctoresController');
const { validarJWT } = require('../midlewares/validarJWT');

const router = Router();

router.get('/', validarJWT, getDoctores);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    crearDoctor);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        validarCampos,

    ],
    actualizarDoctor);

router.delete('/:id', validarJWT, eliminarDoctor);

module.exports = router; //para exportar
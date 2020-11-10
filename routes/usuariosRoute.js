/*
    Ruta: /api/usuarios
    tambien se puede utilizar paginacion
    http://localhost:3000/api/usuarios?desde=10&&limite=5
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuariosController');
const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', validarJWT, getUsuarios);


router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'La estructura del email es incorrecta').isEmail(),
        validarCampos,

    ],
    crearUsuario);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'La estructura del email es incorrecta').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarUsuario);

router.delete('/:id', validarJWT, eliminarUsuario);



module.exports = router; //para exportar
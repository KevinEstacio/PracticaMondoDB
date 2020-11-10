const { Schema, model } = require('mongoose');

const HospitalShema = Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true,

    }
});

HospitalShema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Hospital', HospitalShema);
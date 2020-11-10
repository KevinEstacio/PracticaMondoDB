const { Schema, model } = require('mongoose');

const DoctorShema = Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    }
});

DoctorShema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Doctor', DoctorShema);
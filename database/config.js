//Aca vamos a realizar la configuración de mongoose
//importancion del paquete mongoose
const mongoose = require('mongoose');

const dbconection = async() => {

    //datos del usuario y bd para mongodb
    //usuario: usermean
    //password: mTa8zzkKciWEjiDG

    try {
        //Debemos utilizar la cadena de conexion que tenemos en mongocompass
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Conexion exitosa a Base de datos ');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la Base de datos');
    }
}

//exportamos el modulo para que podamos utilizarlo desde otro sitio
module.exports = {
    dbconection
}
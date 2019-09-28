'use strict'

class API{

    async obtenerDatos() {
        const datos = await fetch('https://api.datos.gob.mx/v1/precio.gasolina.publico');
        const respuesta = await datos.json();
        return {respuesta}
    }
}


'use strict'

class Interfaz {
    constructor() {
         this.api = new API()
         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

         this.markers = new L.LayerGroup();
    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
    }
    mostrarEstablecimientos(){
      this.api.obtenerDatos()
      .then((datos)=>{
        const resultado = datos.respuesta.results;
        this.mostrarPines(resultado)
        
      })
    }
    mostrarPines(datos){

      this.markers.clearLayers();

      datos.forEach((dato)=>{
      const {latitude, longitude, calle, regular, premium, codigopostal} = dato;
      
      const opcionesPopUp =L.popup().setContent(
        `
        <p>Direccion: ${calle}</p>
        <p>Codigo Postal: ${codigopostal}
        <p>Precio gasolina regular: ${regular} $</p>
        <p>Precio gasolina premium: ${premium} $</p>
        `
      )
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopUp)

      this.markers.addLayer(marker)
      })
      this.markers.addTo(this.mapa)
    }

      respuestaBusqueda(busqueda){
        this.api.obtenerDatos()
          .then(datos =>{
            const resultados = datos.respuesta.results;
            this.filtrarResultadoBusqueda(resultados, busqueda)
          })
      }

      filtrarResultadoBusqueda(resultado, busqueda){
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1)
        this.mostrarPines(filtro)
      }
}

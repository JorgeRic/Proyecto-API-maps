'use strict'

const ui = new Interfaz();


document.addEventListener('DOMContentLoaded', ()=>{
  ui.mostrarEstablecimientos();
  
});

let buscar = document.querySelector('#buscar input');
buscar.addEventListener('input', ()=>{

  if(buscar.value.length > 5){
    ui.respuestaBusqueda(buscar.value)
  }else{
    ui.mostrarEstablecimientos()
  }

})
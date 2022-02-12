// ------------------------------BUSQUEDA---------------------------------------------//
const form = document.querySelector("#form-de-busqueda");
const listaProductos = document.querySelector(".lista-productos");
const modalProducto = document.querySelector(".modal-detalle-producto");
const modal = document.querySelector(".modal");
const imagenProducto = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const apiMLA = 'https://api.mercadolibre.com/sites/MLA/search?';
// --------------------------------FILTROS---------------------------------------------//
const inputBusqueda = document.querySelector('#input-de-busqueda');
const seleccionarUbicacion = document.querySelector(".select-ubicacion");
const seleccionarEnvios = document.querySelector("#select-envios");
const seleccionarCondicion = document.querySelector("#select-condicion");
// ----------------------------------------------FILTROS-------------------------------//

const mostrarDetallesProducto = (id_producto) => {
  fetch('https://api.mercadolibre.com/items?ids=' + id_producto)
    .then(res => {
      res.json()
        .then(data => {
          mostrarInformacion(data[0].body)
        })
    });
}


const busquedaPorProducto = () => {
  fetch(`${apiMLA}q=${inputBusqueda.value != "" ? inputBusqueda.value : 'maquillaje'}&state=${seleccionarUbicacion.value}&shipping=${seleccionarEnvios.value}&item_condition=${seleccionarCondicion.value}`)
    .then(res => {
      res.json()
        .then(data => {
          listaProductosHtml(data.results);
        })
    });
}

busquedaPorProducto()
document.onload = () => busquedaPorProducto()
form.onsubmit = (e) => { e.preventDefault(); busquedaPorProducto(); }
seleccionarUbicacion.onchange = () => { busquedaPorProducto(); }
seleccionarEnvios.onchange = () => { busquedaPorProducto(); }
seleccionarCondicion.onchange = () => { busquedaPorProducto(); }


const listaProductosHtml = (data) => {

  const products = data.reduce((acc, i) => {

    return acc + `    
    <div class="container" onclick="mostrarDetallesProducto('${i.id}')"  style='background: url(${i.thumbnail});'>

    <div class="overlay">
        <div class="items"></div>
        <div class="items head" data-id="${i.catalog_product_id}">
            <p>${i.title}</p>
            <hr>

        </div>
    
        <div class="items price">
            <p class="new">${i.price}</p>
        </div>

        <div class="items cart">
            <i class="fa fa-shopping-cart"></i>
            <span> Ver detalle del producto </span>
        </div>
    </div>
</div>   `

  }, "")

  listaProductos.innerHTML = products;

}

function mostrarInformacion(data) {
  debugger

  const cardInfo = `    
   <div class="tarjeta-detalle">
        
        <i class="gg-close-r" onclick="cerrarModal()" ></i>
   
        <div class="foto" > 
        <img src="${data.thumbnail}"/>
        </div>
 
        <div class="description">
              <h4>${data.title}</h4> 
              <h1>${data.price} ARS$</h1> 
              <button>COMPRA AHORA</button>
              <button>AÑADIR A FAVORITOS</button>
        </div>
  </div>
 
    
     
     `
  modal.style.display = "flex";
  modal.innerHTML = cardInfo;
};

const cerrarModal = () => {
  modal.style.display = "none";
}



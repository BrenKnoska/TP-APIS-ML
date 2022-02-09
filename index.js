// ------------------------------BUSQUEDA-------------------------------------------
const inputBusqueda = document.querySelector('#input-de-busqueda')
const form = document.querySelector("#form-de-busqueda")
const listaProductos = document.querySelector(".lista-productos")
const modalProducto = document.querySelector(".modal-detalle-producto")
const modal = document.querySelector(".modal")
const imagenProducto = document.querySelector(".container")
const overlay = document.querySelector(".overlay")
const apiMLA = 'https://api.mercadolibre.com/sites/MLA/search?';

form.onsubmit = (e) => {
  const nombreProducto = e.target.elements.busquedaProducto.value;

  e.preventDefault()
  busquedaPorProducto(nombreProducto)

}

const busquedaPorProducto = (producto) => {

  fetch(apiMLA + 'q=' + producto)
    .then(res => {
      res.json().then(data => {
        console.log(data.results);
        HTMLproducts(data.results);
      })
    });
}

const HTMLproducts = (data) => {

  const products = data.reduce((acc, i) => {

    return acc + `    
    <div class="container" onclick="mostrarDetallesProducto('${i.catalog_product_id}')"  style='background: url(${i.thumbnail});'>

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
</div>
      
      `


  }, "")

  listaProductos.innerHTML = products;

}
function mostrarInformacion(data) {

  console.log(data);

  const cardInfo = `    
  <div class="contenedor-card-detalle">
  <div class="card-detalle">
 

  <div class="card-detalle-imagen" style='background: url(${data.pictures[0].url});'>   </div>

      <div class="card-detalle-informacion">
     
          <p>${data.name}</p>
          <p>${data.buy_box_winner.price} ARS</p> 
      </div>
  </div>
  
  <i class="gg-close-r" onclick="cerrarModal()" ></i>


  </div>
    
    `
  modal.style.display = "block";

  modalProducto.innerHTML = cardInfo;
};


const cerrarModal = () => {
  modal.style.display = "none";
}

const mostrarDetallesProducto = (id_producto) => {

  fetch('https://api.mercadolibre.com/products/' + id_producto)
    .then(res => {
      res.json().then(data => {
        console.log(data);
        mostrarInformacion(data)
      })
    });

}

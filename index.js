// ------------------------------BUSQUEDA-------------------------------------------
const inputBusqueda = document.querySelector('#input-de-busqueda')
const form = document.querySelector("#form-de-busqueda")
const listaProductos = document.querySelector(".lista-productos")
const imagenProducto = document.querySelector(".container")
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
    <div class="container" style='background: url(${i.thumbnail});'>

    <div class="overlay">
        <div class="items"></div>
        <div class="items head" data-id="${i.id}">
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

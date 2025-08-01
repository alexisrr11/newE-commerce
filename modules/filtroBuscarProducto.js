import { renderizarProdcutos } from "./llamarAPI.js";

export function filtrarProductos(productosAPI, searchInput) {
  const textoBusqueda = searchInput.value.toLowerCase();

  const productosFiltrados = productosAPI.filter(producto =>
    producto.nombre.toLowerCase().includes(textoBusqueda)
  );

  renderizarProdcutos(productosFiltrados);
}
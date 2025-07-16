
import { tablaDeCompras } from "./views/tablaCompras.js";

const agregaArticulo = () => {
    //const articulosEnDb = window.api.obtenerArticulos()
    //console.log(articulosEnDb)
    const articulos = []
    const form = document.getElementById("items-form")
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const datos = new FormData(form);
        //const articulo = document.getElementById("descripcion").value;
        const articulo = datos.get("descripcion");
        if (!articulo) {
            alert("No ingreso ningún artículo");
            return;
        }

        const detalles = [
            { articuloId: "descripcion", cantidadId: "cantidad", costoUnitarioId: "costo" }
        ]
        const articuloActual = [];

        detalles.forEach(({ articuloId, cantidadId, costoUnitarioId }) => {
            // const id_alimento = index
            const nombre = datos.get(articuloId);
            const cantidad = datos.get(cantidadId);
            const precio = datos.get(costoUnitarioId);
            // let stock = 0
            // stock = stock + cantidad
            // const descripcion = document.getElementById(articuloId).value;
            // const cantidad = document.getElementById(cantidadId).value;
            // const costoUnit = document.getElementById(costoUnitarioId).value;

            if (nombre && cantidad && precio) {
                //comprobarDuplicados(nombre, cantidad, precio)
                window.api.guardarArticulo(nombre, cantidad, precio)
                articuloActual.push({
                    descripcion: nombre,
                    cantidad: cantidad,
                    costoUnit: precio
                });
            }
            console.log(articuloActual)
        });

        if (articuloActual.length === 0) {
            alert("Tienes items sin completar");
            return;
        }
        // function comprobarDuplicados(nombre, cantidad, precio) {
        //     if (articulosEnDb.some(a => a.nombre === nombre)) {
        //         let stock = articulosEnDb.filter(a => a.nombre === nombre).length
        //         stock = stock + cantidad
        //         precio = precio
        //     }
        // }

        articulos.push(...articuloActual);
        tablaDeCompras(articulos)
        console.log("Articulos acumulados: ", articulos);
        form.reset()
    });
}
export { agregaArticulo }

document.addEventListener("DOMContentLoaded", () => {
    agregaArticulo();

});
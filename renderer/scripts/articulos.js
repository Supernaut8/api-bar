import { tablaDeCompras } from "../views/tablaCompras.js";

const agregaBebida = () => {

    document.addEventListener("DOMContentLoaded", () => {
        console.log("Dom Completamente cargado")

        const tipoSeleccionado = document.getElementById("tipoDeBebidas");
        const varianteElegida = document.getElementById("bebidasVariantes");
        const tiposBebidas = {
            aguas: ["Agua", "Agua Saborizada"],
            gaseosas: ["Pepsi", "Mirinda", "7up", "Pomelo"],
            cervezas: ["Quilmes", "Stella", "Brahma"],
            tragos: ["Gancia", "Fernet", "Whisky", "Tequila"]
        };

        tipoSeleccionado.addEventListener("change", () => {
            const tipo = tipoSeleccionado.value.toLowerCase();

            // Limpiar opciones anteriores
            varianteElegida.innerHTML = `<option value="">Seleccione bebida</option>`;

            // Si hay categoría, agregar productos correspondientes
            if (tiposBebidas[tipo]) {
                tiposBebidas[tipo].forEach((bebida) => {
                    const option = document.createElement("option");
                    option.value = bebida;
                    option.textContent = bebida;
                    varianteElegida.appendChild(option);
                });
            }
        });

        const bebidas = []
        const form = document.getElementById("items-form")

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const datos = new FormData(form);
            const bebida = datos.get("bebidasVariantes");

            if (!bebida) {
                alert("No ingreso ningún artículo");
                return;
            }

            const detalles = [
                { tipoId: "tipoDeBebidas", bebidaId: "bebidasVariantes", cantidadId: "cantidad", costoUnitarioId: "costo" }
            ]
            const bebidaActual = [];
            let duplicado = 0

            detalles.forEach(({ tipoId, bebidaId, cantidadId, costoUnitarioId }) => {
                const tipo = datos.get(tipoId)
                const nombre = datos.get(bebidaId);
                const cantidadStr = datos.get(cantidadId);
                const cantidad = parseInt(cantidadStr);
                const precioStr = datos.get(costoUnitarioId);
                const precio = parseFloat(precioStr);
                let stock = 0
                stock = stock + cantidad
                
                if (nombre && cantidad && precio) {
                    comprobarDuplicados(nombre, tipo, cantidad, precio)
                    window.api.guardarBebida(nombre, tipo, stock, precio)
                }
                console.log(bebidaActual)
            });

            if (bebidaActual.length === 0 && duplicado === 0) {
                alert("Tienes items sin completar");
                return;
            }

            function comprobarDuplicados(nombre, tipo, cantidad, precio) {
                if (bebidas.some(b => b.descripcion === nombre)) {
                    const bebidaDuplicada = bebidas.find(b => b.descripcion === nombre)
                    const indice = bebidas.indexOf(bebidaDuplicada)
                    bebidas[indice].cantidad += cantidad
                    
                    console.log("bebida duplicada")
                    duplicado = 1
                }
                else {
                    bebidaActual.push({
                        descripcion: nombre,
                        tipo : tipo,
                        cantidad: cantidad,
                        costoUnit: precio
                    });
                    console.log("sin duplicados")
                    duplicado = 0
                }
            }

            bebidas.push(...bebidaActual);
            tablaDeCompras(bebidas)
            console.log("Bebidas acumuladas: ", bebidas);
            form.reset()
        });
    });
}
export { agregaBebida };

agregaBebida(); 

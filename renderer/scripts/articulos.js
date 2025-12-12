import { tablaDeCompras } from "../views/tablaCompras.js";

const agregaBebida = () => {

    document.addEventListener("DOMContentLoaded", () => {
        console.log("Dom Completamente cargado")

        const tipoSeleccionado = document.getElementById("tipoDeBebidas");
        const varianteElegida = document.getElementById("bebidasVariantes");
        const tiposBebidas = {
            aguas: ["Agua", "Agua Saborizada"],
            gaseosas: ["Pepsi", "Mirinda", "7up", "Pomelo"],
            cervezas: ["Quilmes", "Stella", "Brahma","Pinta"],
            artesanal: ["Pinta"],
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
                //alert("No ingreso ningún artículo");
                showToast('No ingreso ningún artículo', 'warning');
                return;
            }

            const detalles = [
                {   tipoId: "tipoDeBebidas",
                    bebidaId: "bebidasVariantes",
                    cantidadId: "cantidad",
                    costoUnitarioId: "costo",
                    ivaId: "iva",
                    porcGananciaId: "ganancia"
                }
            ]
            const bebidaActual = [];
            let duplicado = 0

            detalles.forEach(({ tipoId, bebidaId, cantidadId, costoUnitarioId, ivaId, porcGananciaId }) => {
                const tipo = datos.get(tipoId)
                const nombre = datos.get(bebidaId);
                const cantidadStr = datos.get(cantidadId);
                const cantidad = parseInt(cantidadStr);
                const costoStr = datos.get(costoUnitarioId);
                const costo = parseFloat(costoStr);
                const ivaStr = datos.get(ivaId);
                const iva = parseFloat(ivaStr);
                const porcGananciaStr = datos.get(porcGananciaId);
                const porcGanancia = parseFloat(porcGananciaStr); 
                const precio = costo * (1 + iva/100) * (1 + porcGanancia/100);
                let stock = 0
                stock = stock + cantidad
                
                if (nombre && cantidad && costo) {
                    comprobarDuplicados(nombre, tipo, cantidad, costo)
                    window.api.guardarBebida(nombre, tipo, stock, precio)
                    //window.api.guardarAlimento(nombre, tipo, precio)
                }
                console.log(bebidaActual)
            });

            if (bebidaActual.length === 0 && duplicado === 0) {
                //alert("Tienes items sin completar");
                showToast('Tienes items sin completar', 'warning');
                return;
            }

            function comprobarDuplicados(nombre, tipo, cantidad, costo) {
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
                        costoUnit: costo
                    });
                    console.log("sin duplicados");
                    duplicado = 0;
                }
            }

            bebidas.push(...bebidaActual);
            tablaDeCompras(bebidas);
            console.log("Bebidas acumuladas: ", bebidas);
            form.reset();
        });
    });
}
export { agregaBebida };

agregaBebida(); 

import { tablaDeCompras } from "../views/tablaCompras.js";

const agregaBebida = () => {

    document.addEventListener("DOMContentLoaded", () => {
        console.log("Dom Completamente cargado")

        const tipoSeleccionado = document.getElementById("tipoDeBebidas");
        const varianteElegida = document.getElementById("bebidasVariantes");
        const tiposBebidas = {
            aguas: ["Agua Villa Manaos", "Agua varias", "Agua Saborizada"],
            gaseosas: ["Pepsi", "Mirinda", "7up", "Paso de los toros", "Sprite", "Coca-Cola", "Coca-Cola Zero", "Fanta", "Schweppes"],
            cerveza: ["Quilmes lata", "Miller lata","Heineken lata","Andes lata", "Stella lata", "Brahma lata", "Amstel lata", "Budweiser lata", "Dr. Lemon lata"],
            cerveza2: ["Quilmes litro", "Miller litro","Heineken litro","Andes litro", "Stella litro", "Brahma litro", "Budweiser lata"],
            cerveza3: ["Pinta","1/2 Pinta"],
            tragos: ["Gancia limón", "Fernet c/Coca", "Campari c/naranja", "Gintonic Brigthon/Gordon", "Gintonic Beefeater", "Cynnart Julep"],
            tragos2: ["Fernet c/Coca litro", "Gancia limón litro", "Campari c/naranja litro"],
            vinos: ["Hormiga Negra", "San Telmo", "Portillo"]
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
                const variedad = datos.get(tipoId)
                const descripcion = datos.get(bebidaId);
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
                
                if (descripcion && cantidad && costo) {
                    comprobarDuplicados(descripcion, variedad, cantidad, costo)
                    window.api.guardarBebida({descripcion, variedad, stock, precio})
                }
                console.log(bebidaActual)
            });

            if (bebidaActual.length === 0 && duplicado === 0) {
                showToast('Tienes items sin completar', 'warning');
                return;
            }

            function comprobarDuplicados(descripcion, variedad, cantidad, costo) {
                if (bebidas.some(b => b.descripcion === descripcion)) {
                    const bebidaDuplicada = bebidas.find(b => b.descripcion === descripcion)
                    const indice = bebidas.indexOf(bebidaDuplicada)
                    bebidas[indice].cantidad += cantidad
                    
                    console.log("bebida duplicada")
                    duplicado = 1
                }
                else {
                    bebidaActual.push({
                        descripcion: descripcion,
                        variedad : variedad,
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

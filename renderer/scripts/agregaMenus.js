import { tablaDeMenus } from "../views/tablaMenus.js";

const agregaMenu = () => {
    const comidasData = window.api.obtenerMenus();
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Dom Completamente cargado")

        const variedadesEnDB = comidasData.map(comida => comida.variedad)
        console.log(variedadesEnDB)

        const tipoSeleccionado = document.getElementById("tipoDeComidas");
        const varianteElegida = document.getElementById("comidasVariantes");
        const tiposComidas = {
            pizzas: ["Muzzarella", "Jamón y morrones"],
            sandwichs: ["Mila de pollo", "Milanesa", "Jamon y queso"],
            empanadas: ["Carne", "Jamón y queso"],
            entradas: ["Fritas", "Picada", "Bastones de muzza", "Canastas de queso y verdura"],
            postres: ["Helado", "otro"]
        };

        tipoSeleccionado.addEventListener("change", () => {
            const tipo = tipoSeleccionado.value.toLowerCase();

            // Limpiar opciones anteriores
            varianteElegida.innerHTML = `<option value="">Seleccione comida</option>`;

            // Si hay categoría, agregar productos correspondientes
            if (tiposComidas[tipo]) {
                tiposComidas[tipo].forEach((comida) => {
                    const option = document.createElement("option");
                    option.value = comida;
                    option.textContent = comida;
                    varianteElegida.appendChild(option);
                });
            }
        });

        const comidas = []
        const form = document.getElementById("items-form")

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const datos = new FormData(form);
            const comida = datos.get("comidasVariantes");

            if (!comida) {
                alert("No ingreso ningún menú");
                return;
            }

            const detalles = [
                { tipoId: "tipoDeComidas", comidaId: "comidasVariantes", costoUnitarioId: "precio" }
            ]
            const comidaActual = [];
            let menuRepetido = 0

            detalles.forEach(({ tipoId, comidaId, costoUnitarioId }) => {
                const tipo = datos.get(tipoId);
                const variedad = datos.get(comidaId);
                const precioStr = datos.get(costoUnitarioId);
                const precio = parseFloat(precioStr);
                const stock = 1

                if (tipo && variedad && precio) {
                    if (!variedadesEnDB.includes(variedad)) {
                        comidaActual.push({
                            tipo: tipo,
                            descripcion: variedad,
                            costoUnit: precio
                        });
                        window.api.guardarMenu(tipo, variedad, stock, precio);
                        menuRepetido = 0
                    }else {
                        alert("El menú ya se encuentra cargado");
                        menuRepetido = 1
                    }
                }
                console.log(comidaActual)
            });

            if (comidaActual.length === 0 && !menuRepetido) {
                alert("Tienes items sin completar");
                return;
            }

            comidas.push(...comidaActual);
            tablaDeMenus(comidas)
            console.log("comidas acumuladas: ", comidas);
            form.reset()
        });
    });
}
export { agregaMenu };

agregaMenu(); 

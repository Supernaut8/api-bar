import { obtenerMenus } from "./getData.js";
import { tablaDeMenus } from "../views/tablaMenus.js";

const agregaMenu = () => {

    document.addEventListener("DOMContentLoaded", () => {
        const tipoSeleccionado = document.getElementById("tipoDeComidas");
        const varianteElegida = document.getElementById("comidasVariantes");
        const tiposComidas = {
            pizzas: ["Muzzarella chica", "Muzzarella gde.","Muzza porción"],
            sandwichs: ["Sand.Mila de pollo", "Sand.Milanesa", "Sand.Jamon y queso"],
            empanadas: ["Empanada de Carne", "Empanada de Jamón y queso", "Empanada de Cebolla y queso", "Empanada de Verdura",
                "Empanada de Capresse", "Empanada de Bondiola y barbacoa", "Empanada de Vacio y provoleta"],
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

        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const comidasData = await obtenerMenus();
            console.log(comidasData)
            const menuEnDB = comidasData.map(comida => comida.descripcion)
            console.log("Menús por descripción en base de datos: ", menuEnDB)
            const datos = new FormData(form);
            const comida = datos.get("comidasVariantes");

            if (!comida) {
                showToast('No ingreso ningún menú', 'warning');
                return;
            }

            const detalles = [
                { tipoId: "tipoDeComidas", comidaId: "comidasVariantes", costoUnitarioId: "precio" }
            ]
            const comidaActual = [];
            let menuRepetido = 0

            detalles.forEach(({ tipoId, comidaId, costoUnitarioId }) => {
                const variedad = datos.get(tipoId);
                const descripcion = datos.get(comidaId);
                const precioStr = datos.get(costoUnitarioId);
                const precio = parseFloat(precioStr);
                
                if (variedad && descripcion) {
                    if (!menuEnDB.includes(descripcion)) {
                        comidaActual.push({
                            variedad: variedad,
                            descripcion: descripcion,
                            costoUnit: precio
                        });
                        showToast('Nuevo menú agregado con exito', 'success');
                        window.api.guardarMenu({descripcion, variedad, precio});
                        menuRepetido = 0
                    } else {
                        showToast('Este menú ya existe', 'warning');
                        menuRepetido = 1
                        return;
                    }
                }
                console.log(comidaActual)
            });

            if (comidaActual.length === 0 && !menuRepetido) {
                showToast('Tienes items sin completar', 'warning');
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

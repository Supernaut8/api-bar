import { tablaDePedido } from "../views/tablaPedidoBarra.js";

let bebidasTipos = {};

const agregaBebidas = () => {
    let bebidasData = window.api.obtenerBebidas();
    bebidasTipos = new Set(bebidasData.map(bebida => bebida.variedad));
    const pedidosBebidas = [];
    const selectTiposBebidas = document.getElementById('alimentoBebidas');
    const form = document.getElementById("orderBar-form");
    const formEnvioPedido = document.getElementById("sendOrder-form")
    console.log(bebidasData);
    console.log(bebidasTipos);

    //Armado de la descripción del pedido ocultando el título al inicio:
    const titulo = document.getElementById("orderBarTitle");
    titulo.textContent = "Pedido en curso:";
    titulo.style.display = "none";
    //---------------------------------------------

    selectTiposBebidas.innerHTML = '<option value="">Seleccione una opción</option>';
    bebidasTipos.forEach(bebida => {
        const option = document.createElement('option');
        option.value = bebida;
        option.textContent = bebida;
        selectTiposBebidas.appendChild(option);
    });

    selectTiposBebidas.addEventListener('change', () => {
        const tipoElegido = selectTiposBebidas.value.toLowerCase();
        const variantes = bebidasData.filter(bebida => bebida.variedad == tipoElegido);
        console.log(variantes)
        const selectVariantesBebidas = document.getElementById("bebidasVariantes")
        selectVariantesBebidas.innerHTML = '<option value="">Seleccione una opción</option>';
        variantes.forEach(variante => {
            const option = document.createElement("option");
            option.value = variante.descripcion;
            option.textContent = variante.descripcion;
            selectVariantesBebidas.appendChild(option);
            const bebidaElegida = option.value;
            console.log(bebidaElegida)
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Mostrar el título del pedido
        titulo.style.display = "block";

        const datos = new FormData(form);
        const bebida = datos.get("alimentoBebidas");
        const variante = datos.get("bebidasVariantes");
        const cantidadStr = datos.get("cantidadBebidas");
        const cantidad = parseInt(cantidadStr);

        let bebidaActual = [];


        if (!bebida || !variante || !cantidad) {
            showToast('Todos los campos son obligatorios.', 'warning');
            return;
        }
        const precio = bebidasData.find(b => b.descripcion == variante).precio;
        const id_bebida = bebidasData.find(b => b.descripcion == variante).id_alimento;
        const stock = bebidasData.find(b => b.descripcion == variante).stock;

        console.log(bebida);
        console.log(id_bebida);
        console.log(variante);
        console.log(precio);
        comprobarDuplicados(bebida, variante, cantidad, precio, stock);

        function comprobarDuplicados(bebida, variante, cantidad, precio, stock) {
            if (pedidosBebidas.some(b => b.descripcion === variante)) {
                const bebidaExistente = pedidosBebidas.find(b => b.descripcion === variante);
                const indice = pedidosBebidas.indexOf(bebidaExistente);
                pedidosBebidas[indice].cantidad += cantidad;
            }
            else {
                bebidaActual = [
                    {
                        cantidad: cantidad,
                        id: id_bebida,
                        descripcion: variante,
                        variedad: bebida,
                        precio: Math.round(precio),
                        stock: stock
                    }
                ]
            }
            pedidosBebidas.push(...bebidaActual);
            tablaDePedido(pedidosBebidas);
        }
        form.reset();
    });

    formEnvioPedido.addEventListener("submit", function (event) {

        event.preventDefault();
        const pedidosBD = pedidosBebidas;
        console.log(pedidosBD)

        pedidosBD.forEach(pedido => {
            const nro_mesa = 1; // Barra siempre es mesa 1
            const id_alimento = pedido.id;
            const cantidad = pedido.cantidad;
            let efectivo = 0;
            efectivo = efectivo + Math.round(pedido.precio) * pedido.cantidad;

            console.log(efectivo);


            const registrarVenta = (efectivoNuevo) => {
                // 1. Obtener el valor actual (o 0 si es la primera vez)
                let efectivoActual = parseFloat(localStorage.getItem('cajaEfectivo')) || 0;

                // 2. Calcular y guardar el nuevo total
                let nuevoTotal = efectivoActual + efectivoNuevo;

                // 3. Almacenar el nuevo valor en el localStorage (compartido entre pestañas)
                localStorage.setItem('cajaEfectivo', nuevoTotal.toString());
            }

            registrarVenta(efectivo);
            window.api.guardarPedido(nro_mesa, id_alimento, cantidad);
        })
        console.log("Pedido agregado correctamente!");
        showToast('El pedido fue agregado con exito', 'success');
        form.reset();
        tablaDePedido([]); // Limpiar la tabla
    })
}
export { agregaBebidas }
agregaBebidas();
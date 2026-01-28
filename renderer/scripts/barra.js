import { obtenerAlimentos, obtenerBebidas, obtenerMenus } from "./getData.js";
import { agregarPedido } from "./agregaPedidosBarra.js";
import { tablaDePedido } from "../views/tablaPedidoBarra.js";

let pedidos = [];
let totalPedido = 0;

const armaPedidoBarra = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    const comidas = await obtenerMenus();
    const bebidas = await obtenerBebidas();
    const alimentos = await obtenerAlimentos();
    const alimentosDelPedido = [];

    console.log(comidas);
    console.log(bebidas);
    console.log(alimentos);

    //Armado de la descripción del pedido ocultando el título al inicio:
    const titulo = document.getElementById("orderBarTitle");
    titulo.textContent = "Pedido en curso:";
    titulo.style.display = "none";
    //------------------------------------------------------------------

    // //Manejo del boton de impresion de ticket
    // const botonImprimir = document.getElementById("imprimir");
    // botonImprimir.textContent = "Imprimir Ticket";
    // botonImprimir.style.display = "none";
    // //------------------------------------------------------------------

    const buscarAlimento = (nombre) => {
      let lista = alimentos;
      return lista.find(item => item.descripcion === nombre);
    };

    const creaOpcionesSegunAlimento = (alimentoSeleccionado) => {
      const seleccionadoOpciones = alimentos.filter(alimento => alimento.tipo == alimentoSeleccionado);
      console.log(seleccionadoOpciones)
      const variedades = seleccionadoOpciones.map(alimento => alimento.variedad);
      const tipos = {
        aguas: "Aguas",
        gaseosas: "Gaseosas",
        cerveza: "Bebidas c/alcohol latas",
        cerveza2: "Cervezas litro",
        cerveza3: "Cerveza artesanal",
        tragos: "Tragos",
        tragos2: "Tragos de litro",
        vinos: "Vinos",
        pizzas: "Pizzas",
        sandwichs: "Sandwichs",
        empanadas: "Empanadas",
        entradas: "Entradas",
        postres: "Postres"
      }

      //Para eliminar las opciones repetidas..
      const clases = new Set(variedades);
      console.log(seleccionadoOpciones)
      console.log(clases)
      console.log(variedades)

      clases.forEach(clase => {
        const option = document.createElement("option");
        option.value = clase;
        option.textContent = tipos[clase];
        varianteElegida.appendChild(option);
      });
      varianteElegida.addEventListener("change", () => {
        const variante = varianteElegida.value.toLowerCase();
        const variantes = seleccionadoOpciones.filter(alimento => alimento.variedad === variante)
        console.log(variantes)
        opcionElegida.innerHTML = `<option value="">Seleccione una opción</option>`;
        variantes.forEach(variante => {
          const option = document.createElement("option");
          option.value = variante.descripcion;
          option.textContent = variante.descripcion;
          opcionElegida.appendChild(option);
        });
      });
    };

    const alimentoElegido = document.getElementById("items");
    const varianteElegida = document.getElementById("itemsVariantes");
    const opcionElegida = document.getElementById("itemsOpcion");
    const form = document.getElementById("orderBar-form");

    alimentoElegido.addEventListener("change", () => {
      const alimentoSeleccionado = alimentoElegido.value.toLowerCase();

      varianteElegida.innerHTML = `<option value="">Seleccione una opción</option>`;

      creaOpcionesSegunAlimento(alimentoSeleccionado);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();


      const pedidoActual = [];
      const datos = new FormData(form);
      const nro_mesa = 0;
      
      const nombre = datos.get("itemsOpcion");
      const cantidadStr = datos.get("alimentosCantidadBarra");
      const cantidad = parseInt(cantidadStr);

      if (nombre && cantidadStr && !isNaN(cantidad) && cantidad > 0) {
        // Mostrar el título del pedido
        titulo.style.display = "block";

        // Buscar el alimento por nombre
        const alimento = buscarAlimento(nombre);
        console.log(alimento);
        if (!alimento) {
          console.warn(`Alimento no encontrado: ${nombre}`);
          return;
        }

        let efectivo = 0;
        let stock = 0;
        const { precio } = alimento;
        const subtotal = precio * cantidad;
        if (alimento.tipo == 'bebidas')
          stock = bebidas.find(bebida => bebida.id_alimento === alimento.id_alimento).stock;
        efectivo = efectivo + alimento.precio * cantidad;
        console.log(alimento.precio, cantidad, efectivo);
        alimentosDelPedido.push(alimento)

        // Agregar al pedido mostrado
        pedidoActual.push({
          nro_mesa: nro_mesa,
          cantidad: cantidad,
          stock: stock || 1,
          nombre: nombre,
          tipo: alimento.tipo,
          precioUnit: Math.round(precio),
          subtotal: Math.round(subtotal)
        });

        totalPedido += Math.round(subtotal);
      }

      if (pedidoActual.length === 0) {
        showToast('Debe completar al menos un alimento con cantidad válida', 'warning');
        return;
      }

      pedidos.push(...pedidoActual);
      // Mostrar en la tabla
      tablaDePedido(pedidos, totalPedido);

      agregarPedido(pedidos);

      form.reset();

    });
  });
};
armaPedidoBarra();

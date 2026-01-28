import { obtenerAlimentos, obtenerBebidas, obtenerMenus } from "./getData.js";
import { agregarPedido } from "./agregaPedidos.js";
import { tablaDePedido } from "../views/tablaPedido.js";

let pedidos = [];
let totalPedido = 0;

export function limpiarEstadoPedido() {
  pedidos = [];
  totalPedido = 0;
  const titulo = document.getElementById("orderTitle");
  if (titulo) titulo.style.display = "none";
  // Si tienes un contenedor de tabla, vacíalo también aquí
  const tabla = document.querySelector('#order-table'); // Ajusta el ID según tu tabla
  if (tabla) tabla.innerHTML = '';
}

const armaPedido = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    //const pedidos = [];
    const comidas = await obtenerMenus();
    const bebidas = await obtenerBebidas();
    const alimentos = await obtenerAlimentos();
    const alimentosDelPedido = [];

    console.log(comidas);
    console.log(bebidas);
    console.log(alimentos);

    //Armado de la descripción del pedido ocultando el título al inicio:
    const titulo = document.getElementById("orderTitle");
    titulo.textContent = "Pedido en curso:";
    titulo.style.display = "none";
    //------------------------------------------------------------------

    // //Manejo del boton de impresion de ticket
    // const botonImprimir = document.getElementById("imprimir");
    // botonImprimir.textContent = "Imprimir Ticket";
    // botonImprimir.style.display = "none";
    // //------------------------------------------------------------------

    const buscarAlimento = (nombre) => {
      // let lista = alimentosData;
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

    const STORAGE_KEY = 'valorFiltroConservado';
    const campoAConservar = document.getElementById('mesa');
    const alimentoElegido = document.getElementById("alimentos");
    const varianteElegida = document.getElementById("alimentosVariantes");
    const opcionElegida = document.getElementById("varianteOpcion");
    const form = document.getElementById("order-form");

    // --- 1. CARGAR el valor conservado al iniciar la aplicación ---
    // function cargarValorConservado() {
    //   const valorGuardado = localStorage.getItem(STORAGE_KEY);
    //   if (valorGuardado !== null) {
    //     campoAConservar.value = valorGuardado;
    //   }
    // }

    // --- 2. GUARDAR el valor cada vez que el usuario escribe ---
    function guardarValorConservado() {
      // Usamos el evento 'input' para guardar el valor en tiempo real
      campoAConservar.addEventListener('input', (e) => {
        localStorage.setItem(STORAGE_KEY, e.target.value);
      });
    }


    function resetCamposSeleccionados(formElement, camposAExcluir = []) {
      // Itera sobre todos los elementos del formulario
      for (const elemento of formElement.elements) {
        // 1. Verifica si es un campo de input, textarea o select
        // 2. Verifica si el elemento no está en la lista de camposAExcluir
        if (elemento.id !== 'agregarAlimento' && !camposAExcluir.includes(elemento.id)) {

          // Si es un input tipo checkbox o radio, desmarca
          if (elemento.type === 'checkbox' || elemento.type === 'radio') {
            elemento.checked = false;
          }
          // Para el resto de inputs (text, number, select, textarea, etc.), vacía el valor
          else {
            elemento.value = '';
          }
        }
      }
    }

    alimentoElegido.addEventListener("change", () => {
      const alimentoSeleccionado = alimentoElegido.value.toLowerCase();

      varianteElegida.innerHTML = `<option value="">Seleccione una opción</option>`;

      creaOpcionesSegunAlimento(alimentoSeleccionado);
    });

    // let totalPedido = 0;

    form.addEventListener("submit", function (event) {
      event.preventDefault();


      const pedidoActual = [];
      const datos = new FormData(form);
      const nro_mesa = parseInt(datos.get("mesa"));
      if (!nro_mesa) {
        showToast("Debe seleccionar una mesa", 'warning');
        return;
      }

      const nombre = datos.get("varianteOpcion");
      const cantidadStr = datos.get("alimentosCantidad");
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
        //alert("Debe completar al menos un alimento con cantidad válida");
        showToast('Debe completar al menos un alimento con cantidad válida', 'warning');
        return;
      }

      pedidos.push(...pedidoActual);
      // Mostrar en la tabla
      tablaDePedido(pedidos, totalPedido);
      // agregarPedido(alimentosDelPedido);
      agregarPedido(pedidos);
      //window.api.guardarPedido(nro_mesa, id_alimento, cantidad);

      const campoAConservar = document.getElementById('mesa');

      // 2. Define qué campos NO deben resetearse. 
      //    En este caso, solo el campo_a_conservar.
      const camposQueQuieroConservar = [campoAConservar.id];

      // 3. Ejecuta el Pseudo-Reset (¡La clave de la solución!)
      //    Aquí usamos el ID del campo a conservar para que la función lo ignore.
      resetCamposSeleccionados(form, camposQueQuieroConservar);

      // form.reset();

    });
    // document.getElementById('btnTestPrint').addEventListener('click', async () => {
    //   await window.api.testPrint();
    // });
    // cargarValorConservado();
    guardarValorConservado();
  });
};
armaPedido();

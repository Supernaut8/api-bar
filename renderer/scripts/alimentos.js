import { agregarPedido } from "./agregaPedidos.js";
import { tablaDePedido } from "../views/tablaPedido.js";

const agregaAlimentos = () => {
  let comidasData = [];
  let bebidasData = [];
  let alimentosData = [];

  document.addEventListener("DOMContentLoaded", () => {
    const pedidos = [];
    const comidas = window.api.obtenerMenus();
    const bebidas = window.api.obtenerBebidas();
    const alimentos = [...comidas, ...bebidas];
    const alimentosDelPedido = [];
    comidasData = comidas;
    bebidasData = bebidas;
    alimentosData = alimentos;

    console.log(bebidasData)
    console.log(comidasData)
    console.log(alimentosData)

    const buscarAlimento = (nombre) => {
      let lista = alimentosData;
      return lista.find(item => item.variedad === nombre);
    };
  
    const creaOpcionesSegunAlimento = (alimento) => {
      if (alimento == "bebidas") {
        const bebidas = alimentosData.filter(alimento => alimento.esBebida == 1);
        const tiposDeBebidas = bebidas.map(bebida => bebida.tipo)
        const clases = new Set(tiposDeBebidas);
        const variedades = bebidas.map(bebida => bebida.variedad)

        console.log(tiposDeBebidas)
        console.log(clases)
        console.log(variedades)

        clases.forEach(clase => {
          const option = document.createElement("option");
          option.value = clase;
          option.textContent = clase;
          varianteElegida.appendChild(option);
        });
        varianteElegida.addEventListener("change", () => {
          const variante = varianteElegida.value.toLowerCase();
          const variantes = bebidas.filter(bebida => bebida.tipo === variante)
          console.log(variantes)
          opcionElegida.innerHTML = `<option value="">Seleccione una opción</option>`;
          variantes.forEach(variante => {
            const option = document.createElement("option");
            option.value = variante.variedad;
            option.textContent = variante.variedad;
            opcionElegida.appendChild(option);
          });
        });
      }
      else {
        const comidas = alimentosData.filter(alimento => alimento.esBebida == 0);
        const tiposDeComidas = comidas.map(comida => comida.tipo)
        const clases = new Set(tiposDeComidas);
        const variedades = comidas.map(comida => comida.variedad)
        console.log(tiposDeComidas)
        console.log(clases)
        clases.forEach(clase => {
          const option = document.createElement("option");
          option.value = clase;
          option.textContent = clase;
          varianteElegida.appendChild(option);
        });
        varianteElegida.addEventListener("change", () => {
          const variante = varianteElegida.value.toLowerCase();
          const variantes = comidas.filter(comida => comida.tipo === variante)
          console.log(variantes)
          opcionElegida.innerHTML = `<option value="">Seleccione una opción</option>`;
          variantes.forEach(variante => {
            const option = document.createElement("option");
            option.value = variante.variedad;
            option.textContent = variante.variedad;
            opcionElegida.appendChild(option);
          });
        });
      }

    };

    const tiposAlimentos = alimentos.reduce((acc, alimento) => {
      // Si no existe un array para este tipo, lo creamos
      if (!acc[alimento.tipo]) {
        acc[alimento.tipo] = [];
      }
      // Añadimos la variedad al grupo correspondiente
      acc[alimento.tipo].push(alimento.variedad);
      return acc;
    }, {});
    
    const alimentoElegido = document.getElementById("alimentos");
    const varianteElegida = document.getElementById("alimentosVariantes");
    const opcionElegida = document.getElementById("varianteOpcion");
    const form = document.getElementById("order-form");

    alimentoElegido.addEventListener("change", () => {
      const alimento = alimentoElegido.value.toLowerCase();

      varianteElegida.innerHTML = `<option value="">Seleccione una opción</option>`;

      creaOpcionesSegunAlimento(alimento);
    });

    let totalPedido = 0;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      
      const pedidoActual = [];
      const datos = new FormData(form);
      const nro_mesa = parseInt(datos.get("mesa"));
      if (!nro_mesa) {
        alert("Debe seleccionar una mesa");
        return;
      } 

      const nombre = datos.get("varianteOpcion");
      const cantidadStr = datos.get("alimentosCantidad");
      const cantidad = parseInt(cantidadStr);

      if (nombre && cantidadStr && !isNaN(cantidad) && cantidad > 0) {
        // Buscar el alimento por nombre
        const alimento = buscarAlimento(nombre);
        console.log(alimento)
        if (!alimento) {
          console.warn(`Alimento no encontrado: ${nombre}`);
          return;
        }

        const { id_alimento, precio } = alimento;
        const subtotal = precio * cantidad;
        alimentosDelPedido.push(alimento)
        // // Guardar en la base de datos
        // window.api.guardarPedido(nro_mesa, id_alimento, cantidad);

        // Agregar al pedido mostrado
        pedidoActual.push({
          nro_mesa,
          cantidad: cantidad,
          nombre: nombre,
          precioUnit: precio,
          subtotal: subtotal
        });

        totalPedido += subtotal;
      }
      
      if (pedidoActual.length === 0) {
        alert("Debe completar al menos un alimento con cantidad válida");
        return;
      }

      pedidos.push(...pedidoActual);
      // Mostrar en la tabla
      tablaDePedido(pedidos, totalPedido);
      agregarPedido(alimentosDelPedido);
      //window.api.guardarPedido(nro_mesa, id_alimento, cantidad);
      form.reset();
    });
  });
};
agregaAlimentos();

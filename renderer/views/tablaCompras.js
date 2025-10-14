const tablaDeCompras = (bebidas) => {
    
    const listadoDeCompra = document.getElementById("aggregate-table");
    listadoDeCompra.innerHTML = `        
        <tr>
            <th>Id_Artículo</th>
            <th>Proovedor</th>
            <th>Unidades</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>PrecioUnit</th>
            <th>Precio</th>
        </tr>   
              
    `;
    bebidas.forEach((bebida, index) => {
        const filaListado = document.createElement("tr");
        filaListado.innerHTML =`
            <td>${index + 1}</td>
            <td>${bebida.proveedor}</td>
            <td>${bebida.cantidad}</td>
            <td>${bebida.tipo}</td>
            <td>${bebida.descripcion}</td>
            <td>${bebida.costoUnit}</td>
            <td>${bebida.costoUnit * bebida.cantidad}</td>
        `;
        listadoDeCompra.appendChild(filaListado);
    });
}
export {tablaDeCompras}

// chat gpt ayuda //

// El html:
// <!DOCTYPE html>
// <html lang="es">
// <head>
//   <meta charset="UTF-8">
//   <title>Tabla Dinámica Bootstrap</title>
//   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
// </head>
// <body>
//   <div class="container mt-4">
//     <form id="formulario" class="mb-4">
//       <div class="mb-3">
//         <label for="nombre" class="form-label">Nombre</label>
//         <input type="text" id="nombre" class="form-control" required>
//       </div>
//       <div class="mb-3">
//         <label for="edad" class="form-label">Edad</label>
//         <input type="number" id="edad" class="form-control" required>
//       </div>
//       <button type="submit" class="btn btn-primary">Agregar</button>
//     </form>

//     <div id="tabla-container"></div>
//   </div>

//   <script src="script.js"></script>
// </body>
// </html>


// El .js:
// const form = document.getElementById("formulario");
// const tablaContainer = document.getElementById("tabla-container");

// // Crear estructura base de la tabla si no existe
// function crearTabla() {
//   if (!document.getElementById("tabla-usuarios")) {
//     tablaContainer.innerHTML = `
//       <table class="table table-striped table-bordered" id="tabla-usuarios">
//         <thead class="table-dark">
//           <tr>
//             <th>#</th>
//             <th>Nombre</th>
//             <th>Edad</th>
//           </tr>
//         </thead>
//         <tbody id="cuerpo-tabla"></tbody>
//       </table>
//     `;
//   }
// }

// let contador = 1;

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const nombre = document.getElementById("nombre").value.trim();
//   const edad = document.getElementById("edad").value.trim();

//   if (nombre && edad) {
//     crearTabla(); // Asegura que la tabla existe

//     const cuerpoTabla = document.getElementById("cuerpo-tabla");

//     const nuevaFila = document.createElement("tr");
//     nuevaFila.innerHTML = `
//       <td>${contador++}</td>
//       <td>${nombre}</td>
//       <td>${edad}</td>
//     `;

//     cuerpoTabla.appendChild(nuevaFila);

//     // Limpiar formulario
//     form.reset();
//   }
// });

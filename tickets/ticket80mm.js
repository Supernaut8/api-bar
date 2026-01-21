// export function generarTicket80mm(data) {
//     const { alimentos, fecha, mesa, total } = data;
//     const ancho = 42; // caracteres útiles
//     let salida = '';

//     const linea = () => '-'.repeat(ancho);
//     const centrar = texto =>
//         texto.padStart((ancho + texto.length) / 2).padEnd(ancho);

//     salida += centrar('EFECTO REBOTE') + '\n';
//     salida += linea() + '\n';
//     salida += `Mesa: ${mesa}\n`;
//     salida += `Fecha: ${fecha}\n`;
//     salida += linea() + '\n';

//     console.log(alimentos)
//     alimentos.forEach(item => {
//         const subtotal = item.cantidad * item.precioUnit;
//         salida += `${item.nombre}\n`;

//         const izq = `  ${item.cantidad} x $${item.precioUnit}`;
//         const der = `$${subtotal}`;

//         salida += izq.padEnd(ancho - der.length) + der + '\n';
//     });

//     salida += linea() + '\n';

//     const totalStr = `$${total}`;
//     salida += 'TOTAL:'.padEnd(ancho - totalStr.length) + totalStr + '\n';

//     salida += linea() + '\n';
//     salida += centrar('Gracias por su visita') + '\n';

//     return salida;
// }

export function generarTicket80mm(data) {
    const {
        alimentos = [],
        fecha = '',
        mesa = '',
        total = 0
    } = data;

    if (!Array.isArray(alimentos)) {
        throw new Error('Pedido inválido: alimentos no es un array');
    }

    const ancho = 42;
    let salida = '';

    const linea = () => '-'.repeat(ancho);
    const centrar = txt =>
        txt.padStart((ancho + txt.length) / 2).padEnd(ancho);

    salida += centrar('EFECTO REBOTE') + '\n';
    salida += linea() + '\n';
    salida += `Mesa: ${mesa}\n`;
    salida += `Fecha: ${fecha}\n`;
    salida += linea() + '\n';

    alimentos.forEach(item => {
        const subtotal = item.cantidad * item.precioUnit;
        salida += `${item.nombre}\n`;

        const izq = `  ${item.cantidad} x $${item.precioUnit}`;
        const der = `$${subtotal}`;
        salida += izq.padEnd(ancho - der.length) + der + '\n';
    });

    salida += linea() + '\n';
    const totalStr = `$${total}`;
    salida += 'TOTAL:'.padEnd(ancho - totalStr.length) + totalStr + '\n';
    salida += linea() + '\n';
    salida += centrar('Gracias por su visita') + '\n';

    return salida;
}

export function ticket80mmHTML(texto) {
    return `
    <html>
      <body>
        <pre style="
          font-family: monospace;
          font-size: 12px;
          width: 80mm;
        ">
${texto}
        </pre>
      </body>
    </html>
  `;
}


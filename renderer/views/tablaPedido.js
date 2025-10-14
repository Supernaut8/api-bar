const tablaDePedido = (pedidos, totalPedido) => {
    const tablaPedido = document.getElementById("order-table");
    const cuerpoDeTabla = document.createElement("tbody")

    if (!tablaPedido) {
        console.error("No se encontró el elemento con id 'order-table'");
        return;
    }
    // const titulo = document.createElement("caption")
    //tablaPedido.appendChild(titulo)
    tablaPedido.innerHTML = `        
            <tr>
                <th>Mesa</th>
                <th>Unid</th>
                <th>Descripción</th>
                <th>PrecioUnit</th>
                <th>PrecioTotal</th>
            </tr>        
    `
    pedidos.forEach((pedido) => {
        const filaPedido = document.createElement("tr");
        filaPedido.innerHTML = `
            <td id="mesaNro">${pedido.nro_mesa}</td>
            <td id="cantidad">${pedido.cantidad}</td>
            <td id="nombre">${pedido.nombre}</td>        
            <td>$${pedido.precioUnit}</td>
            <td>$${pedido.subtotal}</td>
            
        `
        const contenedorPrecio = document.getElementById("total-container")
        contenedorPrecio.innerHTML = `
            <span>Total:</span>
            <span>$${totalPedido} </span>
        `
        cuerpoDeTabla.appendChild(filaPedido)
        tablaPedido.appendChild(cuerpoDeTabla);
    });
}
export { tablaDePedido }
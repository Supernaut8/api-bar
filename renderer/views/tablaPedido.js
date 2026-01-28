const tablaDePedido = (pedidos, totalPedido) => {
    const tablaPedido = document.getElementById("order-table");
    const cuerpoDeTabla = document.createElement("tbody")

    if (!tablaPedido) {
        console.error("No se encontró el elemento con id 'order-table'");
        return;
    }
    
    tablaPedido.innerHTML = `        
            <tr>
                <th>Mesa</th>
                <th>Unidades</th>
                <th>Stock</th>
                <th>Descripción</th>
                <th>Precio x unidad</th>
                <th>Precio Total</th>
            </tr>        
    `
    pedidos.forEach((pedido) => {
        console.log(pedido)
        const filaPedido = document.createElement("tr");
        filaPedido.innerHTML = `
            <td id="mesaNro">${pedido.nro_mesa}</td>
            <td id="cantidad">${pedido.cantidad}</td>
            <td>${pedido.stock - pedido.cantidad}</td>
            <td id="nombre">${pedido.nombre}</td>        
            <td>$${pedido.precioUnit}</td>
            <td>$${pedido.subtotal}</td>
            
        `;
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
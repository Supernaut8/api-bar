const tablaDePedido = (pedidos) => {
    const tablaPedido = document.getElementById("order-table");
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
                <th>Precio</th>
                <th>Total</th>
            </tr>        
    `
    pedidos.forEach((pedido) => {
        const filaPedido = document.createElement("tr");
        filaPedido.innerHTML = `
            <td>${pedido.nro_mesa}</td>
            <td>${pedido.cantidad}</td>
            <td>${pedido.alimento}</td>        
            <td>${pedido.alimento.precio}</td>
            <td>${pedido.alimento.precio * pedido.cantidad}</td>
            <td>${pedido.costoDelPedido}</td>
        `
        tablaPedido.appendChild(filaPedido);
    });
}

export { tablaDePedido }
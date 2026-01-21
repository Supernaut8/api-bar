import { obtenerPedidos } from "../scripts/getData.js"

const muestraPedidosHistorial = async () => {
    let pedidos = await obtenerPedidos();
    console.log(pedidos);

    const tablaPedidosHistorial = document.getElementById('orderHistoryTable');
    const thead = tablaPedidosHistorial.querySelector('thead');
    thead.innerHTML = `
        <tr>
            <th scope="col">Nro de Pedido </th>
            <th scope="col">Nro Mesa</th>
            <th scope="col">Fecha</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Alimento</th>
            <th scope="col">Precio</th>
            <th scope="col">Total</th>
        </tr>
    `;
    const tbody = tablaPedidosHistorial.querySelector('tbody');
    pedidos.forEach(pedido => {
        //Convierto de string a tipo date:
        const fechaObj = new Date(pedido.fecha_hora); 
        //Luego le doy formato de hora local:
        const fecha = fechaObj.toLocaleString('es-ES');
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${pedido.id_pedido}</td>
            <td>${pedido.nro_mesa}</td>
            <td>${fecha}</td>
            <td>${pedido.cantidad}</td>
            <td>${pedido.nombre}</td>
            <td>${pedido.precio * pedido.cantidad}</td>
            <td>${pedido.total}</td>
        `;
        tbody.appendChild(fila);
    });
    tablaPedidosHistorial.appendChild(thead);
    tablaPedidosHistorial.appendChild(tbody);
}
muestraPedidosHistorial();
export { muestraPedidosHistorial };

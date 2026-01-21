export function generarTicketCocina(data) {
    const {
        alimentos = [],
        fecha = '',
        mesa = '',
    } = data;
    const ancho = 42;
    let salida = '';

    const linea = () => '-'.repeat(ancho);
    const centrar = txt =>
        txt.padStart((ancho + txt.length) / 2).padEnd(ancho);

    salida += centrar('COCINA') + '\n';
    salida += linea() + '\n';
    salida += `Mesa: ${mesa}\n`;
    salida += `Hora: ${fecha}\n`;
    salida += linea() + '\n';

    alimentos.forEach(item => {
        salida += `${item.cantidad} x ${item.nombre}\n`;
    });

    salida += linea() + '\n';

    return salida;
}
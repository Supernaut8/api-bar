const horaYFecha = () => {
    const ahora = new Date();
    
    const opciones = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit', // Opcional: puedes quitarlo si no quieres segundos
        hour12: false      // Usa true si prefieres formato AM/PM
    };
    
    // Usamos toLocaleString para obtener fecha + hora
    // 1. Obtenemos el texto base
    let texto = ahora.toLocaleString('es-ES', opciones);

    // 2. Convertimos la primera letra a Mayúscula y sumamos el resto
    const formatoFinal = texto.charAt(0).toUpperCase() + texto.slice(1);

    const barraDeNavegacion = document.getElementById("navBar");
    
    // Limpiamos el contenido previo si la función se llama varias veces
    // (Útil si quieres que el reloj se mueva)
    const existingDisplay = document.querySelector(".containerDate");
    if (existingDisplay) existingDisplay.remove();

    const horaActualDisplay = document.createElement("div");
    horaActualDisplay.classList.add("containerDate");
    
    horaActualDisplay.innerHTML = `
        <span>${formatoFinal}</span>
    `;
    barraDeNavegacion.appendChild(horaActualDisplay);
}

export { horaYFecha };


document.addEventListener("DOMContentLoaded", () => {
    // Se ejecuta inmediatamente al cargar
    horaYFecha(); 
    
    // Se actualiza cada 1 segundo (1000ms)
    setInterval(horaYFecha, 1000); 
});
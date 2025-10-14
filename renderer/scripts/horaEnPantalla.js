const horaYFecha = () => {
    const horaActual = new Date();
    console.log((horaActual));
    

    const barraDeNavegacion = document.getElementById("navBar")
    const horaActualDisplay = document.createElement("div");
    horaActualDisplay.classList.add("containerDate");
    // horaActualDisplay.id("horaActual")
    horaActualDisplay.innerHTML = `
        <span>${horaActual}<span/>
    `;
    barraDeNavegacion.appendChild(horaActualDisplay)
    
}


  window.addEventListener('DOMContentLoaded', () => {
    if (window.api) {
      console.log("window.api está definido 👌");
      const pedidos = window.api.obtenerPedidos();
      console.log("Pedidos:", pedidos);
    } else {
      console.warn("window.api sigue siendo undefined 🛑");
    }
  });



export { horaYFecha }

document.addEventListener("DOMContentLoaded", horaYFecha);
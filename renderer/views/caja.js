import { agregaAlimentos } from "../alimentos.js"

const ingresoEfectivo = (alimento) => {
    // const cajaInicial = document.getElementById("opening")
    // const cajaActual = document.getElementById("closing")

    // const displayCash = document.createElement("input")
    // displayCash.
    const displayCash = document.getElementById("openInput") 
    displayCash.value = "000000"

    const displayCash1 = document.getElementById("closeInput")
    displayCash.value = displayCash.value + alimento.precioUnit

}
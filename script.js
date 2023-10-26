import { createMapa, optionsNivel, winGame } from "./assets/numberNivel.js"

// Opciones del juego
let nivel = "principiante"
// let estilo = 1
let mapaOrdenado
let mapa
let tiempo
let tiempoEstado = false
let tiempoNumero = {
  minutos: 3,
  segundos: 0,
  milisegundos: 0
}
let initialTime = 0

// Iniciamos la variable root que contiene el elemento con el id root
// y también la variable interfaz que sera el que contiene el elemento de la interfaz
const root = document.getElementById("root")
const blockMove = document.querySelector(".blockMove")
const interfaz = document.querySelector(".interfazGame")
const btnTiempo = document.querySelector(".time button")
const elementJuego = document.querySelector(".juego")

// Dando funcionalidad a la interfaz de inicio
const btnsNivel = document.querySelectorAll(".nivel button")
btnsNivel.forEach((btn) => btn.addEventListener('click', () => {
  btnsNivel.forEach(button => button.classList.remove("punto"))
  btn.classList.add("punto")
  nivel = btn.innerText.toLowerCase()
}))

const btnsEstilo = document.querySelectorAll(".imagenes button")
btnsEstilo.forEach((btn) => btn.addEventListener('click', () => {
  btnsEstilo.forEach(button => button.classList.remove("select"))
  btn.classList.add("select")
  // estilo = parseInt(btn.id)
}))

// Bonton JUGAR 
const btnJugar = document.querySelector(".jugar")
btnJugar.addEventListener('click', () => {
  const arrayMapa = createMapa(nivel)
  mapaOrdenado = arrayMapa[0]
  mapa = arrayMapa[1]
  const opcionesNivel = optionsNivel(nivel)
  root.style.gridTemplateColumns = opcionesNivel.gridTemplates
  tiempoNumero.minutos = opcionesNivel.minutes
  tiempoNumero.segundos = 0
  paintMapInWeb()
  document.querySelector(".mensaje").style.opacity = "0"
  document.querySelector(".mensaje").innerText = "."
  btnTiempo.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg>`
  interfaz.style.display = "none"
  elementJuego.style.display = "block"
  blockMove.style.display = "none"

  root.style.height = `${root.offsetWidth}px`
  blockMove.style.height = `${root.offsetWidth}px`
  document.querySelector('.minutes').innerText = tiempoNumero.minutos.toString()
  document.querySelector('.seconds').innerText = tiempoNumero.segundos.toString().padStart(2, '0')
})

// DECLARAMOS FUNCIONES
//
// funcion que pintara los minutos y segundos
const pintarNumbers = () => {
  document.querySelector('.minutes').innerText = tiempoNumero.minutos.toString()
  document.querySelector('.seconds').innerText = tiempoNumero.segundos.toString().padStart(2, '0')
}
// funcion que se ejecutara para el temporizador
export function temporizador() {
  if (tiempoNumero.minutos == 0 && tiempoNumero.segundos == 0 && tiempoNumero.milisegundos == 0) {
    clearInterval(tiempo)
    btnTiempo.innerHTML = " "
    document.querySelector(".mensaje").innerText = "Te quedaste sin tiempo. Vuelve a intentarlo"
    document.querySelector(".mensaje").style.opacity = "1"
    blockMove.style.display = "block"
  }
  else if(document.querySelector(".mensaje").style.opacity == "1"){
    clearInterval(tiempo)
    btnTiempo.innerHTML = " "
  } else if (!tiempoEstado) {
    clearInterval(tiempo)
    btnTiempo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                          </svg>`
  } else {
    if (tiempoNumero.milisegundos == 0) tiempoNumero.milisegundos = 99
    else tiempoNumero.milisegundos--

    if (tiempoNumero.segundos == 0 && tiempoNumero.milisegundos == 99) tiempoNumero.segundos = 59
    else if (tiempoNumero.milisegundos == 99) tiempoNumero.segundos--

    if (tiempoNumero.segundos == 59 && tiempoNumero.milisegundos == 99) tiempoNumero.minutos--

    pintarNumbers()
    console.log(document.querySelector(".mensaje").style.opacity)
  }
}

const ejecutaElTiempo = () => {
  tiempoEstado = !tiempoEstado

  if (tiempoEstado) {
    tiempo = setInterval(temporizador, 10)
    btnTiempo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                          <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                        </svg>`
  } else {
    btnTiempo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                          </svg>`
    initialTime = 0
  }
}

// Boton que pone en pausa el tiempo 
btnTiempo.addEventListener('click', () => {
  initialTime = 1
  ejecutaElTiempo()
})

// Boton regresar
const btnRegresar = document.querySelector(".exit")
btnRegresar.addEventListener('click', () => {
  tiempoEstado = false
  initialTime = 0
  interfaz.style.display = "block"
  elementJuego.style.display = "none"
})

// Boton reiniciar
const btnReiniciar = document.querySelector(".reiniciar")
btnReiniciar.addEventListener('click', () => {
  document.querySelector(".mensaje").style.opacity = "0"
  document.querySelector(".mensaje").innerText = "."
  btnTiempo.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="50" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg>`
  blockMove.style.display = "none"
  const arrayMapa = createMapa(nivel)
  mapa = arrayMapa[1]
  const opcionesNivel = optionsNivel(nivel)
  tiempoNumero.minutos = opcionesNivel.minutes
  tiempoNumero.segundos = 0
  tiempoEstado = false
  initialTime = 0
  document.querySelector('.minutes').innerText = tiempoNumero.minutos.toString()
  document.querySelector('.seconds').innerText = tiempoNumero.segundos.toString().padStart(2, '0')
  paintMapInWeb()
})

// funciones para ejecutar el movimiento y para que se pinte el juego
const moveCuadrado = (i, f) => {
  initialTime++
  if(initialTime == 1) ejecutaElTiempo()

  let posicionMovimientos = []
  const number = mapa[i][f]

  posicionMovimientos.push([i - 1, f])
  posicionMovimientos.push([i, f + 1])
  posicionMovimientos.push([i + 1, f])
  posicionMovimientos.push([i, f - 1])

  posicionMovimientos.forEach(posicion => {
    if (posicion[0] >= 0 && posicion[0] <= mapa.length - 1 && posicion[1] >= 0 && posicion[1] <= mapa.length - 1) {
      if (mapa[posicion[0]][posicion[1]] == " ") {
        mapa[posicion[0]][posicion[1]] = number
        mapa[i][f] = " "
        paintMapInWeb(root)
        if (winGame(mapaOrdenado, mapa)) {
          blockMove.style.display = "block"
          tiempoEstado = false
        }
      }
    }
  })
}

const paintMapInWeb = () => {
  root.innerHTML = ''

  mapa.forEach((row, i) => {
    row.forEach((element, f) => {
      const div = document.createElement("div")
      div.innerText = element
      if (mapa[i][f] !== ' ') {
        div.addEventListener('click', () => moveCuadrado(i, f))
        div.classList.add("div")
      }
      root.append(div)
    })
  })
}

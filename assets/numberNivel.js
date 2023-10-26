function numberNivel(nivel) {
  if(nivel === "principiante") return 3
  else if (nivel === "intermedio") return 4
  else if (nivel === "avanzado") return 5
  else return 6
}

export function createMapa(nivel) {
  let newMapaInitial = []
  let newMapa = []
  let createMapa = []
  let indiceMapa = 0
  const numeroNivel = numberNivel(nivel)

  for (let i = 0; i < numeroNivel * numeroNivel; i++){
    if(i == (numeroNivel*numeroNivel) - 1) createMapa.push(` `)
    else createMapa.push(`${i + 1}`)
  }

  for (let i = 0; i < numeroNivel; i++){
    const row = []
    for (let f = 0; f < numeroNivel; f++){
      row.push(createMapa[indiceMapa])
      indiceMapa++
    }
    newMapaInitial.push(row)
  }

  indiceMapa = 0

  createMapa.sort(() => Math.random() - 0.5);

  for (let i = 0; i < numeroNivel; i++){
    const row = []
    for (let f = 0; f < numeroNivel; f++){
      row.push(createMapa[indiceMapa])
      indiceMapa++
    }
    newMapa.push(row)
  }

  return [newMapaInitial, newMapa]
}

export function optionsNivel(nivel) {
  const numeroNivel = numberNivel(nivel)
  let option = {
    gridTemplates: '',
    minutes: 0
  }

  if (numeroNivel == 3) {
    option.gridTemplates = "auto auto auto"
    option.minutes = 3
  }
  else if (numeroNivel == 4) {
    option.gridTemplates = "auto auto auto auto"
    option.minutes = 4
  }
  else if (numeroNivel == 5) {
    option.gridTemplates = "auto auto auto auto auto"
    option.minutes = 6
  }
  else {
    option.gridTemplates = "auto auto auto auto auto auto"
    option.minutes = 8
  }

  return option
}

// Función que verifica si termino el game
export const  winGame = (mapaInitial, mapaUpdate) => {
  let state = true
  mapaInitial.forEach((row, i) => {
    row.forEach((bloque, f) => {
      if (bloque != mapaUpdate[i][f]) state = false
    })
  })
  
  if (state) {
    document.querySelector(".mensaje").style.opacity = "1"
    document.querySelector(".mensaje").innerText = mensajeWin()
    const jsConfetti = new JSConfetti()
    for(let i=0; i < 3; i++){
      jsConfetti.addConfetti()
    }
  }

  return state
}

// Función que dara mensajes aleatorios cuando se gana 
export const mensajeWin = () => {
  const mensajes = ['Muy bien 👍', '¡Bien Hecho! 🎉', '¡Lo hiciste bien! 😁']
  const index =  Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  return mensajes[index]
}
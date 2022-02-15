// Constructor
function Seguro(marca, anio, tipo){
    this.marca,
    this.anio,
    this.tipo
}


Seguro.prototype.cotizarSeguro = function() {
    let cantidad
    const base = 2000

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15
            break
        case '2':
            cantidad = base * 1.05
            break
        case '3':
        cantidad = base * 1.35
        break
    }

    // Leer el anio
    const diferencia = new Date().getFullYear() - this.anio
    // Cada año de diferencia hay que reducir 3% el valor del seguro
    cantidad -= (diferencia * 3 * cantidad) /100

    //  Si el seguro es básico  se multiplica por 30 % mas  //
    //  Si el seguro es completo 50 5 más  //
    
    if(this, tipo === 'basico'){
        cantidad *= 1.30 
    }else {
        cantidad *= 1.50
    }

    return cantidad
}



// Toda lo que se muestra
function Interfaz() {

}

// Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarError = function(mensaje, tipo) {
    const div = document.createElement('div')

    if(tipo === 'error') {
        div.classList = 'error'
    }else {
        div.classList = 'correcto'
    }
    div.innerHTML = `${mensaje}`
    formulario.insertBefore(div, document.querySelector('.form-group'))

    setTimeout(function() {
        document.querySelector('.mensaje').remove()
    }, 3000)
}

// Imprime el resultado de la cotizacion
Interfaz.prototype. mostrarResultado = function(seguro, total) {
    const resultado = document.getElementById('resultado')
    let marca
    switch(seguro.marca) {
        case '1':
            marca = 'Americano'
            break
        case '2':
            marca = 'Asiatico'
            break
        case '3':
            marca = 'Europeo'
        break
    }
    // Crear div  
    const div = document.createElement('div')
    // Insertar la informacion
    div.innerHTML = `
        <p class="header"> Tu resumen: </p>
        <p> Marca: ${seguro.marca} </p>
        <p> Año: ${seguro.anio} </p>
        <p> Tipo: ${seguro.tipo} </p>
        <p> Total: ${seguro.total} </p>
    `

    const spinner = document.querySelector('#cargando img')
    spinner.style.display = 'block'
    setTimeout(function() {
        spinner.style.display = 'none'
        resultado.appendChild(div)
    }, 3000)
    
}   

// Imprime el resultado de la cotizacion

const formulario = document.getElementById('cotizar-seguro')

// Event Listener
function eventListener() {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault()

        // leer la marca seleccionada del select
        const marca = document.getElementById('marca')
        const marcaSeleccionada = marca.options[marca.selectedIndex].value

        console.log(marcaSeleccionada)

        // leer al año seleccionado del select
        const anio = document.getElementById('anio')
        const anioSeleccionado = anio.options[anio.selectedIndex].value

        console.log(anioSeleccionado)

        // lee el valor del radio button
        const tipo = document.querySelector('input[name="tipo"]:checked').value
        
        // Crear instancia de interfaz
        const interfaz = new Interfaz();

        // Revisamos que los campos no estén vacios
        if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
            interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error')
        }else {
            // Limpair resultados anteriores
            const resultados = document.querySelector('#resultado div')
            if(resultado != null) {
                resultados.remove()
            }
            // Instanciar seguro y mostrar interfaz
            const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo)
            // Cotizar el seguro
            const cantidad = seguro.cotizarSeguro()
            // Mostrar el resultado
            interfaz.mostrarResultado(seguro, cantidad)
            interfaz.mostrarMensaje('Cotizando...', 'exito')
        }

    })
}

const max = new Date().getFullYear()
const min = max - 20

const selectAnios = document.getElementById('anio')
for (let i = max; i > min; i--) {
    let option = document.createElement('option') // Menu desplegable
    option.value = i
    option.innerHTML = i
    selectAnios.appendChild(option)
}





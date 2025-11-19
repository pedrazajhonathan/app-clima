let entrada = document.getElementById('ciudad')
let pais = document.getElementById('pais')
let fecha = document.getElementById('fecha')
let imagen = document.getElementById('imagen')
let temperatura = document.getElementById('temperatura')
let padre = document.getElementById('padre')
let temperatura_maxima = document.getElementById('temperatura-maxima') 
let temperatura_minima = document.getElementById('temperatura-minima')
let humedad = document.getElementById('humedad') 
let api_key = 'ca4dd25c092166213be1eaa4638a5a36'
let resta = 273.15
let direccion_img = 'https://openweathermap.org/img/wn/10d@2x.png'

function mostrar(){
    if(entrada.value){
        buscar_api(entrada)
    }
}

async function buscar_api(ciudad){
    try {
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value}&appid=${api_key}`) 
        let api_lista = await api.json()
        console.log(api_lista) 
        informacion(api_lista)
    } catch (error) {
        
    }
}

function informacion(api_lista){
    let tiempo = new Date()
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado','dominguo']
    let meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
    let tiempo_total = `${dias[tiempo.getDay()]}, ${tiempo.getDate()} de ${meses[tiempo.getMonth()]}`
    let temperatura_info = `${Math.floor(api_lista.main.temp - resta)}°C`
    let direccion_img = `https://openweathermap.org/img/wn/${api_lista.weather[0].icon}@2x.png`
    let temperatura_maxima_info = `Max:${Math.floor(api_lista.main.temp_max - resta)}°C`
    let temperatura_minimo_info = `Min:${Math.floor(api_lista.main.temp_min - resta)}°C`
    let humedad_info = `Humedad:${api_lista.main.humidity}%`
    let pais_info = `${api_lista.name},${api_lista.sys.country}`

    fecha.textContent = tiempo_total
    pais.textContent = pais_info
    imagen.src = direccion_img
    temperatura.textContent = temperatura_info
    temperatura_maxima.textContent = `🌡️ ${temperatura_maxima_info}`
    temperatura_minima.textContent = `❄️ ${temperatura_minimo_info}`
    humedad.textContent = `💧 ${humedad_info}`

}

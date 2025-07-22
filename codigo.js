function obtenerBibliotecas() {
    console.log(fetch);
    fetch("json/bibliotecas.geojson")
    .then(respuesta => {
        if(respuesta.ok) {
            return respuesta.json();
        } else {
            throw new Error("Error descargando los datos: " + respuesta.status);
        }
    })
    .then(mostrarBibliotecas)
    .catch(error => window.alert(error));
}
function mostrarBibliotecas(datos) {
    for (const punto of datos.features) {
        // Lo normal es usar latitud y longitud pero en los archivos geojson viene
        // al revés
        const latitud = punto.geometry.coordinates[1];
        const longitud = punto.geometry.coordinates[0];
        // Usando desestructurización
        //const [longitud, latitud] = punto.geometry.coordinates;
        const marca = L.marker([latitud, longitud]).addTo(mapa);
        // Operador de coalescencia nula ??: coge el primer valor que no sea null o undefined
        const nombre = punto.properties.nombre ?? punto.properties.title;
        let web = punto.properties.web ?? null;
        if(web != null && web.startsWith("http") == false) {
            web = "http://" + web;
        } 
        if(web == null){
            marca.bindPopup(nombre);
        } else {
            marca.bindPopup(`<p>${nombre}</p><a href="${web}">${web}</a>`);
        }
    }
    mapa.setZoom(13);
}

function obtenerCines() {

}

function obtenerFuentes() {

}

function obtenerHoteles() {

}

const mapa = L.map("mapa").setView([42.23282, -8.72534], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mapa);

document.getElementById("cines").addEventListener("click", obtenerCines);
document.getElementById("hoteles").addEventListener("click", obtenerHoteles);
document.getElementById("bibliotecas").addEventListener("click", obtenerBibliotecas);
document.getElementById("fuentes").addEventListener("click", obtenerFuentes);



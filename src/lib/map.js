(function (){
    const lat = 20.4549926; 
    const lng = -97.7332597;
    const map = L.map('map').setView([lat, lng ], 16);
    let marker
    const geocoderService = L.esri.Geocoding.geocoderService();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> contributors'
    }).addTo(map);

  marker = new L.marker([lat, lng],{
    draggable:true,
    autoPan:true,
  }).addTo(map);

  marker.on('moveend', function (e){
    marker=e.target
    const position=marker.getLatLng()
    console.log(`El usuario soltó el marcador en las coordenadas:${position.lat},${position.lng}`)
    map.panTo(new L.LatLng(position.lat, position.lng))

    geocoderService.reverse().latlng(position, 13).run(function(error, result){
        console.log(`La información calculada por geocoder al intentar hacer la georeferencia
        inversa es: ${result}`)
        console.log(result)

        marker.bindPopup(result.address.LongLabel)
    })
})
})







/*document.addEventListener('DOMContentLoaded', function() {
    console.log('Hasta aqui funciona bien.')
    const lat = 20.617893; 
    const lng = -97.818094;
    const map = L.map('map').setView([lat, lng ], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> contributors'
    }).addTo(map);
})*/

$(document).ready(function() {

    document.getElementById("map").innerHTML = "";

    var kc_myMap = L.map('map', {
        center: [39.0997, -94.5786],
        zoom: 11
    });

    let kc_mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let kc_accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
    let kc_myLayer = L.tileLayer(kc_mapboxUrl, {id: 'mapbox.streets-satellite', maxZoom: 20, accessToken: kc_accessToken});
    kc_myLayer.addTo(kc_myMap);

    var kc_url = "https://data.kcmo.org/resource/c6e8-258d.geojson"

    d3.json(kc_url, function(response){

        console.log(response);

        var heatArray = [];

        for (var i = 0; i < response.features.length; i++) {
            heatArray.push([response.features[i].properties['latitude'], response.features[i].properties['longitude'], 100.0])
        }

        var heat = L.heatLayer(heatArray, {
            radius: 20,
            blur: 35
        }).addTo(kc_myMap)

    });
})
$(document).ready(function() {

    document.getElementById("map").innerHTML = "";

    'use strict';
    var jc_myMap = L.map('map', {
      center: [39.0997, -94.5786],
      zoom: 11
    });

    let jc_mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let jc_accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
    let jc_myLayer = L.tileLayer(jc_mapboxUrl, {id: 'mapbox.streets-satellite', maxZoom: 20, accessToken: jc_accessToken});
    jc_myLayer.addTo(jc_myMap);

    var jc_url = "https://ims.jocogov.org/crimemaps/Handler.ashx?element=divResults&type=!0Calls&query=GetCrimes&Dist=&minDate=3/26/2018&maxDate=4/26/2018&minTime=0000&maxTime=2400&mapLeft=-95.08543212890623&mapRight=-94.57456787109373&mapTop=39.214924447583975&mapBottom=38.57362787062739&maxrec=300&app=jccomp&api=xml&mobi=1"

    d3.xml(jc_url, function(error, data) {
        data = [].map.call(data.querySelectorAll("inc"), function(inc) {
          return {
            latitude: inc.querySelector("Y").textContent,
            longitude: inc.querySelector("X").textContent
          }
        });

        var heatArray = [];

        for (var i = 0; i < data.length; i++) {
            heatArray.push([data[i].latitude, data[i].longitude, 200.0])
        }

        var heat = L.heatLayer(heatArray, {
                              radius: 20,
                              blur: 35
                  }).addTo(jc_myMap)
    });

})
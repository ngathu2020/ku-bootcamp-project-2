$(document).ready(function() {

    document.getElementById("recreation-map").innerHTML = "";

    // Creating map object
    var map = L.map("recreation-map", {
        center: [39.0997, -94.5786],
        zoom: 11
    });
    
    // Adding tile layer
    let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
    let myLayer = L.tileLayer(mapboxUrl, {id: 'mapbox.streets-satellite', maxZoom: 20, accessToken: accessToken});
    myLayer.addTo(map);
    
    var link = "https://cdn.rawgit.com/jpham1991/dataset_kc/d01eb5e7/Kansas%20City%20Missouri%20Parks%20and%20Boulevards%20Map.geojson";
    
    
    
    function chooseColor(parktype) {
        switch (parktype) {
        case "County, Major":
            return "yellow";
        case "Community":
            return "red";
        case "Regional":
            return "orange";
        case "Golf, Public":
            return "green";
        case "Golf, Private":
            return "purple";
        case "Neighborhood":
            return "green";
        case "Parkway/Boulevard":
            return "blue";
        case "Greenway":
            return "white";
        default:
            return "black";
        }
    }
    
    // Grabbing our GeoJSON data..
    d3.json(link, function(data) {
        console.log(data);
        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data, {
        style: function(feature) {
            return {
            color: "white",
            fillColor: chooseColor(feature.properties.parktype),
            fillOpacity: 0.5,
            weight: 1.5
            };
        },
        onEachFeature: function(feature, layer) {
            // Set mouse events to change map styling
            layer.on({
            // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
            mouseover: function(event) {
                layer = event.target;
                layer.setStyle({
                fillOpacity: 0.9
                });
            },
            // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
            mouseout: function(event) {
                layer = event.target;
                layer.setStyle({
                fillOpacity: 0.5
                });
            },
            // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
            click: function(event) {
                map.fitBounds(event.target.getBounds());
            }
            });
            // Giving each feature a pop-up with information pertinent to it
            layer.bindPopup("<h1>" + feature.properties.parkname + "</h1> <hr> <h3>Area Type: " + feature.properties.parktype + "</h3>");
    
        }
        }).addTo(map);
    });
      
});
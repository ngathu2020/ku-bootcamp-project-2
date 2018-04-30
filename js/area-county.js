$(document).ready(function() {

    document.getElementById("county-map").innerHTML = "";

    // Creating map object
    var map = L.map("county-map", {
        center: [39.0997, -94.5786],
        zoom: 9.6
    });
    
    // Adding tile layer
    let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
    let myLayer = L.tileLayer(mapboxUrl, {id: 'mapbox.streets-satellite', maxZoom: 20, accessToken: accessToken});
    myLayer.addTo(map);
    
    var link = "https://raw.githubusercontent.com/jackparmer/mapbox-counties/master/us-counties.json";
    
    // Function that will determine the color of a neighborhood based on the borough it belongs to
    function chooseColor(name) {
        switch (name) {
        case "Johnson":
            return "yellow";
        case "Jackson":
            return "red";
        case "Wyandotte":
            return "orange";
        case "Platte":
            return "green";
        case "Cass":
            return "purple";
        case "Clay":
            return "pink";
        case "Miami":
            return "blue";
        case "Ray":
            return "white";
        case "Leavenworth":
            return "black";
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
            fillColor: chooseColor(feature.properties.name),
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
            layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr>");
    
        }
        }).addTo(map);
    });
  
});
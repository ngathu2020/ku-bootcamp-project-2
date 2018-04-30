$(document).ready(function() {

    document.getElementById("pop-map").innerHTML = "";

    // Creating map object
    var map = L.map("pop-map", {
        center: [39.0997, -94.5786],
        zoom: 10
    });
    
    // Adding tile layer
    let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
    let myLayer = L.tileLayer(mapboxUrl, {id: 'mapbox.outdoors', maxZoom: 20, accessToken: accessToken});
    myLayer.addTo(map);
    
    var link = "https://github.com/jpham1991/dataset_kc/blob/master/metrogreen.geojson";
    
    var cities = [{
        location: [39.099722, -94.578333],
        name: "Kansas City, MO",
        county: "Jackson, Clay, Platte, Cass",
        population: "481,420",
        density: "1,400/sq m"
    },
    {
        location: [38.982222, -94.670833],
        name: "Overland Park, KS",
        population: "188,966",  
        county: "Johnson",
        density: "2,300/sq m"
    },
    { location: [39.106667, -94.676389],
        name: "Kansas City, KS",
        population: "151,709",
        county: "Wyandotte",
        density: "1,100/sq m"
    },
    { location: [39.079722, -94.406667],
        name: "Independence, MO",
        population: "117,030",
        county: "Jackson",
        density: "1,500/sq m"
    },
    { location: [38.880833, -94.803056],
        name: "Olathe, KS",
        population: "135,473",
        county: "Johnson",
        density: "2,110/sq m"
    },
    {
        location: [38.9225, -94.374167],
        name: "Lee's Summit, MO",
        population: "96,076",
        county: "Jackson, Cass",
        density: "1,400/sq m"
    },
    {
        location: [39.012778, -94.765833],
        name: "Shawnee, KS",
        population: "65,194",
        county: "Johnson",
        density: "1,500/sq m"
    },
    {
        location: [39.017778, -94.274444],
        name: "Blue Springs, MO",
        population: "54,431",
        county: "Jackson",
        density: "2,400/sq m"
    },
    {
        location: [39.240833, -94.426389],
        name: "Liberty, MO",
        population: "30,614",
        county: "Clay",
        density: "1,000/sq m"
    },
    { 
        location: [38.964722, -94.759444],
        name: "Lenexa, KS",
        population: "52,903",
        county: "Johnson",
        density: "1,400/sq m"
    },
    {
        location: [39.311111, -94.9225],
        name: "Leavenworth, KS",
        population: "36,154",
        county: "Leavenworth",
        density: "1,500/sq m"
    },
    {
        location: [38.966667, -94.616944],
        name: "Leawood, KS",
        population: "34,565",
        county: "Johnson",
        density: "2,100/sq m"
    }];
    
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        L.marker(city.location)
        .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Estimated Population & Housing: " + city.population + "</h3> <hr> <h3>County: " + city.county + "</h3> <hr> <h3>Density: " + city.density + "</h3>")
        .addTo(map);
    }
  
});
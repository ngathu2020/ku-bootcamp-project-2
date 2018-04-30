$(document).ready(function() {

    document.getElementById("park-map").innerHTML = "";

    // Creating map object
    var map = L.map("park-map", {
        center: [39.01, -94.60],
        zoom: 11.1
    });
    
    // Adding tile layer
    let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
    let myLayer = L.tileLayer(mapboxUrl, {id: 'mapbox.run-bike-hike', maxZoom: 20, accessToken: accessToken});
    myLayer.addTo(map);
    
    var link = "https://github.com/jpham1991/dataset_kc/blob/master/metrogreen.geojson";
    
    var baseMaps = {
        "Nature & Parks" : myLayer
    };

    var cities = [{
        location: [38.932129, -94.616440],
        name: "Leawood City Park",
        city: "Leawood, KS"
    },
    {
        location: [38.913858, -94.600696],
        name: "Carl Migliazzo Park",
        city: " "
    },
    { 
        location: [39.039701, -94.579189],
        name: "Ewing and Muriel Kauffman Memorial Garden",
        city: " "
    },
    { 
        location: [39.035079, -94.591970],
        name: "Loose Park",
        city: "Kansas City, MO"
    },
    { 
        location: [39.035079, -94.591970],
        name: "Loose Park Garden",
        city: " "
    },
    {
        location: [39.000772, -94.531749],
        name: "Kansas City Zoo",
        city: "Kansas City, MO"
    },
    {
        location: [39.062165, -94.597856],
        name: "Thomas Hart Benton Home and Studio State Historic Site",
        city: "Kansas City, MO"
    },
    {
        location: [39.082066, -94.581486],
        name: "Sea Life Kansas City",
        city: " "
    },
    {
        location: [39.119779, -94.610432],
        name: "Lewis & Clark Historic Park at Kaw Point",
        city: "Kansas City, KS"
    },
    { 
        location: [39.007535, -94.542560],
        name: "Swope Park",
        city: " "
    },
    {
        location: [39.042145, -94.588032],
        name: "Mill Creek Park",
        city: " "
    },
    {
        location: [38.877725, -94.703304],
        name: "Deanna Rose Children's Farmstead",
        city: "Overland Park, KS"
    },
    {
        location: [39.010043, -94.683023],
        name: "Antioch Park",
        city: " "
    },
    {
        location: [39.085303, -94.625343],
        name: "Shawnee Park",
        city: " "
    },
    {
        location: [38.970312, -94.758584],
        name: "Sar-Ko-Par Trails Park",
        city: " "
    }];

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        L.marker(city.location)
        .bindPopup("<h1>" + city.name + "</h1> <hr> <h3> City: " + city.city + "</h3>")
        .addTo(map);
    }
  
});
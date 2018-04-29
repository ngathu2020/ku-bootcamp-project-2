$(document).ready(function() {
    var city = "Kansas City"; 
    var api_key = "X1-ZWz1gd7cng5897_634pb"
    var queryURL = "http://www.zillow.com/webservice/GetZestimate.htm&zws-id=" + api_key;

    d3.json(queryURL, function(error, response) {
      if (error) {
        return console.warn(error);
      }
      
      var img = response.data[0].images.fixed_height.url;
      console.log(img);
      d3.select("img").attr("src", img)
    })

    // create line chart
    Plotly.d3.json('/line', function(error, data){
      if (error) return console.warn(error);

      var layout = { margin: { t: 0 } }
      var LINE = document.getElementById('line');
      Plotly.plot(LINE, data);
    })


});
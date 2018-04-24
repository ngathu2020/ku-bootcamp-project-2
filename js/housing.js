$(document).ready(function() {
    var city = "Avengers: Infinity War"; 
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=movies+" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    d3.json(queryURL, function(error, response) {
      if (error) {
        return console.warn(error);
      }
      
      var img = response.data[0].images.fixed_height.url;
      console.log(img);
      d3.select("img").attr("src", img)
    })

});
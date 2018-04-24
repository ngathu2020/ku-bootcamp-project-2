var selected_city = 'KC'

$(document).ready(function() {

    // select city
    d3.selectAll(".select-city").on("change", select_city);

});

function select_city(d) {
    console.log(d.value, " ", d3.event);
}
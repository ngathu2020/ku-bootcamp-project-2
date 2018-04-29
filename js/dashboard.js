$(document).ready(function() {

    //for TESTING only-- to be removed
    calculate_dashboard();        

});

function load_school_file() {
    $.ajax({
        url: "\data\school.json",
        success: function (data) {
            // read data
            var parsed_data = JSON.parse(data);
            console.log(parsed_data);
            // set dashboard counts
            calculate_dashboard(parsed_data);        
        }
    });    
}

function calculate_dashboard(parsed_data) {
    //TODO: calculate all the numbers here...

    // set values for display
    $("#school_year").text("2016");
    $("#graduation_rate").text("85%");
    $("#recreation_year").text("2016");
    $("#public_park_count").text("5,120");
    $("#existing_house_year").text("2016");
    $("#for_sale_count").text("120,000");
    $("#incident_year").text("2016");
    $("#incident_count").text("150,000");
}


//for TESTING only-- to be removed
function calculate_dashboard() {
    // set values for display
    $("#school_year").text("2016");
    $("#graduation_rate").text("85%");
    $("#recreation_year").text("2016");
    $("#public_park_count").text("5,120");
    $("#existing_house_year").text("2016");
    $("#for_sale_count").text("120,000");
    $("#incident_year").text("2016");
    $("#incident_count").text("150,000");
}
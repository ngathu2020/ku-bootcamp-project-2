$(document).ready(function() {

    // autoload dashboard at startup
    var dashboard_fragment = "/templates/page-dashboard.html#page-content";
    $("#page-content").load(dashboard_fragment, function() {
        calculate_dashboard();
    });

    // load page in the page-content div when clicked
    $(".page-link").click(function(e) {
        e.preventDefault();
        $("#page-content").load($(this).attr('href'));
     });
   
});


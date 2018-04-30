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

function popUpWindow(URL, windowName, windowWidth, windowHeight) {
    var centerLeft = (screen.width/2)-(windowWidth/2);
    var centerTop = (screen.height/2)-(windowHeight/2);
    var windowFeatures = 'toolbar=no, location=no, directories=no, status=no, menubar=no, titlebar=no, scrollbars=no, resizable=yes, ';
    return window.open(URL, windowName, windowFeatures +' width='+ windowWidth +', height='+ windowHeight +', top='+ centerTop +', left='+ centerLeft);
   }

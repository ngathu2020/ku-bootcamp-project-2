jQuery('#myTable'.ddTableFilter());

var $tbody = document.querySelector("#myTableBody");

d3.csv("MoDataSet.csv", function (error, MoDataSet) {
    if (error) throw error;
    console.log(MoDataSet);
    console.log([error])
 

    var filteredMissouridata = MoDataSet;
    console.log(MoDataSet)

    function renderTable() {
        $tbody.innerHTML = "";

        for (var i = 0; i < filteredMissouridata.length; i++) {

            var school = filteredMissouridata[i];
            var fields = Object.keys(school);

            var $row = $tbody.insertRow(i);
            for (var j = 0; j < fields.length; j++) {

                var field = fields[j];
                var $cell = $row.insertCell(j);
                $cell.innerText = school[field];
            }
        }
        $('table').ddTableFilter();
    }
    renderTable()
})

function popUpWindow(URL, windowName, windowWidth, windowHeight) {
    var centerLeft = (screen.width/2)-(windowWidth/2);
    var centerTop = (screen.height/2)-(windowHeight/2);
    var windowFeatures = 'toolbar=no, location=no, directories=no, status=no, menubar=no, titlebar=no, scrollbars=no, resizable=yes, ';
    return window.open(URL, windowName, windowFeatures +' width='+ windowWidth +', height='+ windowHeight +', top='+ centerTop +', left='+ centerLeft);
   }

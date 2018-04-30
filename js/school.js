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


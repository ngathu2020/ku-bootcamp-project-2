// $(document).ready(function() {

// });
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
$searchBtn.addEventListener("click", handleSearchButtonClick);
function handleSearchButtonClick() {

    filteredMissouridata = MoDataSet;
    var filterArray = [{
        "key": "district",
        "value": $districtInput.value
    }, {
        "key": "city",
        "value": $cityInput.value.toUpperCase()
    }, {
        "key": "county",
        "value": $countyInput.value.toUpperCase()
    }, {
        "key": "zip",
        "value": $zipInput.value.toUpperCase()
    }, {
        "key": "schooltype",
        "value": $schooltypeInput.value.toUpperCase()

    }];

    var tableData = MoDataSet;

    filterArray.forEach(input => {
        var filterKey = input.key;
        var filterValue = input.value;

        if (filterValue == "") {
            return;
        } else {
            tableData = tableData.filter(school => {
                return filterValue === school[filterKey];
            });
        };

    });
    filteredschooldata = tableData;
    renderTable();

}

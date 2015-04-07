window.onload = init;

var data = TableData.data.people;

function init() {
    // fill data
    fillTable(data);

    var table = document.getElementById("dataBody");
    sortModule.init(table);
    filterModule.init(table);

    // set listeners
    document.getElementById("firstName").onclick = sortModule.sort;
    document.getElementById("lastName").onclick = sortModule.sort;
    document.getElementById("filterValue").onkeyup = filterModule.filter;
}

// fill the table with all data
function fillTable(dataForTable) {
    // get header and create a row
    var header = document.getElementById("dataHeader");
    var headerRow = document.createElement("tr");

    // add 3 headers for each column
    // id
    var idHeader = document.createElement("th");
    idHeader.id = "id";
    idHeader.innerHTML = "#";

    // firstname
    var firstNameHeader = document.createElement("th");
    firstNameHeader.id = "firstName";
    firstNameHeader.innerHTML = "First name";

    // lastname
    var lastNameHeader = document.createElement("th");
    lastNameHeader.id = "lastName";
    lastNameHeader.innerHTML = "Last name";

    // append all columns
    headerRow.appendChild(idHeader);
    headerRow.appendChild(firstNameHeader);
    headerRow.appendChild(lastNameHeader);

    // append header row
    header.appendChild(headerRow);

    //get table body
    var tableBody = document.getElementById("dataBody");

    // fill table
    for (var i = 0; i < (dataForTable).length; i++) {
        // create a row
        var row = document.createElement("tr");
        row.className = "dataRow";

        // add id
        var id = document.createElement("td");
        id.innerHTML = i.toString();

        // add firstname
        var firstName = document.createElement("td");
        firstName.innerHTML = dataForTable[i].firstName;

        // add lastname
        var lastName = document.createElement("td");
        lastName.innerHTML = dataForTable[i].lastName;

        // add columns
        row.appendChild(id);
        row.appendChild(firstName);
        row.appendChild(lastName);

        // add row to the table
        tableBody.appendChild(row);
    }
}

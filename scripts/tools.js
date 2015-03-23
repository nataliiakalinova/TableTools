window.onload = init;

var data = TableData.data.people;

function init() {
    // fill data
    fillTable(data);

    // set listeners
    document.getElementById("firstName").onclick = sort;
    document.getElementById("lastName").onclick = sort;
    document.getElementById("filterValue").onkeyup = filter;
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

// the listener for columns
function sort(e) {
    // get the column for sorting
    var target = e && e.target || window.event.srcElement;

    if (target) {
        var className = target.className;

        // if this column unsorted, sort ASC
        if ((className.indexOf("sortedASC") === -1) && (className.indexOf("sortedDESC") === -1)) {
            sortTable(target.cellIndex, false);
            target.className += "sortedASC";
        }
        // else sort DESC
        else if (className.indexOf("sortedASC") != -1) {
            removeClass(target, "sortedASC");
            sortTable(target.cellIndex, true);
            target.className += "sortedDESC";
        }
        // else make the table unsorted
        else if (className.indexOf("sortedDESC") != -1) {
            removeClass(target, "sortedDESC");
            sortTable();
        }
    }
}

// remove class for sort indication
function removeClass(e, className) {
    e.className = e.className.replace(new RegExp("\\b" + className + "\\b\\s*", "g"), "");
}

// get all rows
function getAllRowsAsArray(table) {
    var elements = [];
    if (table) {
        var rows = table.children;

        // add push them into array
        for (var i = 0; i < rows.length; i++) {
            elements.push(rows[i]);
        }
    }
    return elements;
}

// append rows from array
function appendElements(elements, table) {
    if ((table) && (elements)) {
        for (var i = 0; i < elements.length; i++) {
            table.appendChild(elements[i]);
        }
    }
}

// sort method for all columns
function sortTable(column, reverse) {
    // get array for elements
    var table = document.getElementById("dataBody");
    var elements = getAllRowsAsArray(table);

    // if table was sorted DESC, do sort by id
    if (arguments.length === 0) {
        column = 0;
    }

    // sort elements by content
    elements.sort(function (a, b) {
        return (a.cells[column].innerHTML > b.cells[column].innerHTML);
    });

    // add reverse the array if necessary
    if (reverse) {
        elements.reverse();
    }
    appendElements(elements, table);
}

function filter(e) {
    // get value for sorting
    var target = e && e.target || window.event.srcElement;

    if (target) {
        // get field for filter
        var form = document.filterForm;
        var column = (form.field[0].checked) ? 1 : 2;

        // get table rows
        var table = document.getElementById("dataBody");
        var elements = getAllRowsAsArray(table);

        // build regexp for filter
        var data = target.value.toLowerCase();
        var regexp = new RegExp("^(" + data + ")");

        // for each element
        elements.map(function (elem) {
            // if no matches, hide element
            if (!regexp.test(elem.cells[column].innerHTML.toLowerCase())) {
                elem.style.display = "none";
            }
            // else display it
            else {
                elem.style.display = "table-row";
            }
        });

        appendElements(elements, table);
    }
}
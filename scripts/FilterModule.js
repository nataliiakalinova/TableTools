var filterModule = (function () {
    var table;

    return {
        init: function (tableInit) {
            table = tableInit;
        },

        filter: function (e) {
            // get value for sorting
            var target = e && e.target || window.event.srcElement;

            if (target) {
                // get field for filter
                var form = document.filterForm;
                var column = (form.field[0].checked) ? 1 : 2;

                // get table rows
                var elements = tableProcessing.getAllRowsAsArray(table);

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

                tableProcessing.appendElements(elements, table);
            }
        }


    };
})();
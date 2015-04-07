var sortModule = (function(){
    var table;
    // remove class for sort indication
    function removeClass(e, className) {
        e.className = e.className.replace(new RegExp("\\b" + className + "\\b\\s*", "g"), "");
    }

    // sort method for all columns
    function sortTable(column, reverse) {
        // get array for elements
        var elements = tableProcessing.getAllRowsAsArray(table);

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
        tableProcessing.appendElements(elements, table);
    }

    return {
        init: function(tableInit) {
            table = tableInit;
        },

        sort: function(e) {
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


    };
})();
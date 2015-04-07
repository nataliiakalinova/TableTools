var tableProcessing = (function(){
    return {
        getAllRowsAsArray: function (table) {
            var elements = [];
            if (table) {
                var rows = table.children;

                // add push them into array
                for (var i = 0; i < rows.length; i++) {
                    elements.push(rows[i]);
                }
            }
            return elements;
        },
        // append rows from array
        appendElements: function (elements, table) {
            if ((table) && (elements)) {
                for (var i = 0; i < elements.length; i++) {
                    table.appendChild(elements[i]);
                }
            }
        }
    }
})();
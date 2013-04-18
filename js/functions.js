var sorted = []; // La lista ordenada de los IDs de los artículos

// Función para ordenar los elementos de un array
function sortOnKeys(dict) {
    sorted = Array();
    for(var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();
    sorted.reverse();

    var tempDict = {};
    for(var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
}

function goBack() {
    window.history.back()
}

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query() {
 var paramArr = [].slice.call(arguments);
 var copyCol = paramArr[0].map((i) => Object.assign({}, i));
 if(paramArr.length == 1 && Array.isArray(paramArr[0])) {
     return copyCol;
 } else {
    var operations = [].slice.call(arguments, 1);
    operations.sort();
   
   for (var operation of operations) {
    (copyCol = operation(copyCol));
   }
   return copyCol;
 } 
 
}

/**
 * @params {String[]}
 */
function select() {
    var fieldList = [].slice.call(arguments);
return function selectKeys (collection) {
    for(var elem of collection) {
        var keys = Object.keys(elem);
        for(var i of keys){
            if(!fieldList.includes(i)) {
                delete elem[i];
            }
        }
    }
    
    return collection;
}

}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    var filterElems = [].slice.call(arguments);
    var property = filterElems[0];
    var values = filterElems[1];
    return function filterValue(collection){
        var newCol = [];
        collection.filter(function(elem) {
            var currentPropertyValue = elem[property];
            if(values.find((e) => e == currentPropertyValue)) {
                newCol.push(elem);
            }
        })
        return newCol;
    }
    
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

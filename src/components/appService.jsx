var doPOST = (url, options, callback)=>{
    $.ajax({
        type: "POST",
        url: url,
        data: options,
        cache: false,
        success: (data) => {callback(data)},
        error: function (xhr, status, err) {
            console.error(status, err.toString());
        }
    });
};

var doGET = (url, options, callback)=>{
    $.ajax({
        type: "GET",
        url: url,
        data: options,
        cache: false,
        success: (data) => {callback(data)},
        error: function (xhr, status, err) {
            console.error(status, err.toString());
        }
    });
};

var getRelatedData = (options, callback) => {
    doGET("/getRelated", options, callback)
};

var getLeases = (options, callback) => {
    doGET("/getLeases", options, callback)
};

var getMaxValues = (options, callback) =>{
    doGET('/getMaxValues', options, callback)
};

module.exports = {
    getLeases: getLeases,
    getRelatedData: getRelatedData,
    getMaxValues: getMaxValues,
    doPOST: doPOST
};
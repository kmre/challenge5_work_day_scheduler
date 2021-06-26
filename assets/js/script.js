var tasks = {};
var segments = [];
var segmentByHour = [];

function setToday(params) {
    var today = moment().format('MMMM Do YYYY, h:mm:ss a'); 
    console.log(today)
    $("#currentDay").append(today);
}

setToday();

createDivs();

//create divs for every hr of the day and run other fn
function createDivs() {
    new Array(24).fill().forEach((value, index) => {
        segmentByHour.push(moment( {hour: index} ).format('h:mm A'));
    })

    for (let index = 0; index <= 23; index++) {
        debugger;
        createRowsFn(index);
        hrDivFn(index);
        hrPFn(index);
    }
}

//create div with row class for each index
function createRowsFn(index) {

    var divCreateRow = $("<div>").addClass("hr-seg row i" + index)
    $("#main-container").append(divCreateRow)
    $(divCreateRow).attr("id", "independent-rows" + index)
    debugger;
    
}

//add the hr div to the row class
function hrDivFn(index) {
    var divCreateHr = $("<div>").addClass("seg-time col-4 d-flex justify-content-center align-items-center i" + index)
    $("#independent-rows" + index).append(divCreateHr)
    $(divCreateHr).attr("id", "seg-time" + index)
    debugger;
}

//add the hr time to each hr div
function hrPFn(index) {
    var hrP = $("<p>").addClass("time-by-hr i" + index)
        .text(segmentByHour[index])
        console.log(hrP)
        console.log(segmentByHour[index])
        $("#seg-time" + index).append(hrP)
        $(hrP).attr("id", "time-by-hr" + index)
}



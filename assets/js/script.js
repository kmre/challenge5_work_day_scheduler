
var segmentByHour = [];
var changeInInput = [];
var txtp = "";
var txtF = "";
var changed = false;
var save = true;
var mainIndex = 0;
var saveClicked = false;
var locked = "";
var unlocked = "";
var idTxt = "";
var newText = "";
var existing;

var saveObj = {
    hr: [],
    input: [],
    change: [],
    today: moment().format('MMMM Do YYYY, h:mm A')
  };

//Set current day in header
function setToday(params) { 
    //console.log(today)
    $("#currentDay").append(saveObj.today);
}

//run main fns
setToday();
createDivs();

function checkTimes() {
    //debugger;
        for (let t = 0; t < 24; t++) {
            
            if (saveObj.input[t] !== "") {
             console.log(saveObj.input[t])   
            var todayCheck =  moment().format('HH');
            var endTime = t; 
            var hrNow = parseInt(todayCheck) 
            console.log(hrNow)
            console.log(endTime)
            var checkHr = endTime - hrNow;

                if ((checkHr > 2)) {
                
                    console.log("green")
                }
                else if ((checkHr <= 2) && (0 < checkHr)) {
                    console.log("yellow")
                }

                else if ((checkHr <= 0)) {
                    console.log("gray")
                }
            }
        }
  };
  
  setInterval(function(){checkTimes()}, ((3000)))

function saveChanges(index) {
    existing = localStorage.getItem('saveObj');
    //console.log(saveObj.input)
    existing = existing ? JSON.parse(existing) : {};
   // console.log(existing)

    for (let q = 0; q < 24; q++) {
        
        if (saveObj.input[q] == null) {
            saveObj.input[q] = "";
        }
    }
    existing["input"] = saveObj.input;
   // console.log(saveObj)
   // console.log(existing)
    localStorage.setItem("saveObj", JSON.stringify(saveObj));
}

window.addEventListener('DOMContentLoaded', displaySavedObj);

function displaySavedObj() {

    existing = localStorage.getItem('saveObj');
  //  console.log(saveObj.input)
   // console.log(existing)
   // console.log(existing==existing)
   // debugger;
    existing = existing ? JSON.parse(existing) : existing = saveObj;
   // console.log(existing)

    for (let q = 0; q < 24; q++) {
        if (saveObj.input[q] == null && existing.input[q] == null) {
            saveObj.input[q] = "";
        }
    }
    saveObj = existing;
   // console.log(saveObj)
   // console.log(existing)
   // console.log(existing["input"])
    localStorage.setItem("saveObj", JSON.stringify(saveObj));

    for (let t = 0; t < 24; t++) {
        $("#input-p" + t).text(saveObj.input[t])
    }
    checkTimes();
}

//create divs for every hr of the day and run other fn
function createDivs() {
    new Array(24).fill().forEach((value, index) => {
        saveObj.hr.push(moment( {hour: index} ).format('h:mm A'));
    })
    //console.log(saveObj)
    for (let index = 0; index <= saveObj.hr.length - 1; index++) {
        //debugger;
        createRowsFn(index);
        hrDivFn(index);
        hrPFn(index);
        inputDivFn(index);
        saveDivFn(index);
        inputPFn(index);
        savePFn(index);
        saveBtnFn(index);
        btnIFn(index);
        spanInputFnLocked(index);
        spanInputFnUnLocked(index);
        saveObj.change[index] = false;
    }
}
 //console.log(changeInInput)
//create div with row class for each index
function createRowsFn(index) {
    var divCreateRow = $("<div>").addClass("hr-seg row i" + index)
    $("#main-container").append(divCreateRow)
    $(divCreateRow).attr("id", "independent-rows" + index)
    //debugger;
}

//add the hr div to the row class
function hrDivFn(index) {
    var divCreateHr = $("<div>").addClass("seg-time col-2 d-flex justify-content-center align-items-center hour shadow-sm i" + index)
    $("#independent-rows" + index).append(divCreateHr)
    $(divCreateHr).attr("id", "hr-time" + index)
    //debugger;
}

//add the hr time to each hr div
function hrPFn(index) {
    var hrP = $("<p>").addClass("time-by-hr i" + index)
        .text(saveObj.hr[index])
        //console.log(hrP)
        //console.log(segmentByHour[index])
        $("#hr-time" + index).append(hrP)
        $(hrP).attr("id", "p-times" + index)
        //saveObj.hr[index] = segmentByHour[index]
        //console.log($("#p-time" + index))
}

//add div for input section to the row class
function inputDivFn(index) {
    var divCreateIn = $("<div>").addClass("seg-input col-8 d-flex align-items-center justify-content-center p-0 i" + index)
    $("#independent-rows" + index).append(divCreateIn)
    $(divCreateIn).attr("id", "hr-input" + index)
    //debugger;
}

//add p for editable input field
function inputPFn(index) {
    var inputP = $("<p>").addClass("w-100 h-100 p-2 border border-light .bg-light shadow-sm d-flex align-items-center justify-content-center")
    $("#hr-input" + index).append(inputP)
    $(inputP).attr("id", "input-p" + index)
    $("#input-p" + index).text(saveObj.input[index])
    //console.log($("testing" + "#input-p" + index))
    //debugger;
}

//add div for save section to the row class
function saveDivFn(index) {
    var divCreateSave = $("<div>").addClass("seg-save col-2 d-flex align-items-center justify-content-center i" + index)
    $("#independent-rows" + index).append(divCreateSave)
    $(divCreateSave).attr("id", "hr-save" + index)
    //debugger;
}

//add <p> to the save section
function savePFn(index) {
    var pSave = $("<p>").addClass("p-save width i" + index)
    $("#hr-save" + index).append(pSave)
    $(pSave).attr("id", "save-p" + index)
}

//add button for the save section inside p
function saveBtnFn(index) {
    var btnSave = $("<button>").addClass("saveBtn")
    $("#save-p" + index).append(btnSave)
    $(btnSave).attr("id", "btn-save" + index)
}

//add <i> to the save section inside button
function btnIFn(index) {
    var btnI = $("<i>").addClass("iBtn")
    $("#btn-save" + index).append(btnI)
    $(btnI).attr("id", "btn-i" + index)
}

//add <span> inside the <i> to add the lock image locked
function spanInputFnLocked(index) {
    var spanBtn = $("<span>").addClass("oi oi-lock-locked d-flex justify-content-center align-items-center i" + index)
    $("#btn-i" + index).append(spanBtn)
    $(spanBtn).attr("id", "locked" + index)

}

//add <span> inside the <i> to add the lock image unlocked
function spanInputFnUnLocked(index) {
    var spanBtn = $("<span>").addClass(/*oi oi-lock-unlocked d-flex justify-content-center align-items-center*/ "i" + index)
    $("#btn-i" + index).append(spanBtn)
    $(spanBtn).attr("id", "unlocked" + index)

}

//on click for the <p> in the input segment change <p> to <textarea>
$(".seg-input").on("click", "p", function(e) {
    e.preventDefault();
    // get current text of p element
    var txt = $(this)
        .text()
        .trim();
    
    // replace p element with a new textarea
    var txtInput = $("<textarea>").addClass("form-control").val(txt);
    $(this).replaceWith(txtInput);
    
    // auto focus new element
    txtInput.trigger("focus");
    txtp = txt;
});

  // editable field was un-focused
  $(".seg-input").on("blur", "textarea", function(e) {
    e.preventDefault();
    // get current value of textarea
    var txt = $(this).val();
    var idTxt = $(this).parent().attr("id").replace("hr-input", "");
     locked = $(this).parent().attr("id").replace("hr-input", "locked");
     unlocked = $(this).parent().attr("id").replace("hr-input", "unlocked");
    
    // recreate p element
    var inputP = $("<p>")
        .addClass("w-100 h-100 p-2 border border-light .bg-light shadow-sm d-flex align-items-center justify-content-center")
        .text(txt);

    // replace textarea with new content
    $(this).replaceWith(inputP);
    txtF = txt;
    
    //check if input changed
    changedInputCheck(txtp, txtF, idTxt);

    //check locks change
    lockDisplayFn(changed, idTxt, locked, unlocked);

  });

  //checks for changes in input field
  function changedInputCheck(txtp, txtF, index) {
    pCheck = txtp;
    fCheck = txtF;

    if (pCheck !== fCheck) {
        changed = true;
        save = false;
        saveObj.change[index] = true;
        newText = txtF;  
    }
    else {
        changed = false;
        saveObj.change[index] = false;
    }
  }
    
    $(".seg-save").on("click", "p", function(e) {
        e.preventDefault();
        // get current index of p element
        var idSave = $(this).parent().attr("id").replace("hr-save", "");
        //console.log("click " + idSave)
        if (saveObj.change[idSave] == true) {
            locked = "locked"+idSave;
            unlocked = "unlocked"+idSave;
            saveObj.change[idSave] = false;
            //console.log(newText)
            //console.log(idSave)
            lockDisplayFn(changed, idSave, locked, unlocked);
            saveObj.input[idSave] = newText;
            saveChanges();
        }
    });

    function lockDisplayFn(changed, idTxt, locked, unlocked){
        //display unlocked
        if ((/*changed == true &&*/ saveObj.change[idTxt] == true)){
            $("#"+locked).removeClass("oi oi-lock-locked d-flex justify-content-center align-items-center")
            $("#"+locked).addClass("oi oi-lock-locked d-none")
            $("#"+unlocked).removeClass("oi oi-lock-unlocked d-none")
            $("#"+unlocked).addClass("oi oi-lock-unlocked d-flex justify-content-center align-items-center")
            
        }
        //display locked
        else if ((/*changed == true &&*/ saveObj.change[idTxt] == false)) {
            //console.log("array"+saveObj.change[idTxt])
            //console.log("locked"+locked)
            $("#"+locked).removeClass("oi oi-lock-locked d-none")
            $("#"+locked).addClass("oi oi-lock-locked d-flex justify-content-center align-items-center")
            $("#"+unlocked).removeClass("oi oi-lock-unlocked d-flex justify-content-center align-items-center")
            $("#"+unlocked).addClass("oi oi-lock-unlocked d-none")
        }
        
    }

// referenced module 5 for portions of the code
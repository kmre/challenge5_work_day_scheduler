var segmentByHour = [];
var changeInInput = [];
var txtp = "";
var txtF = "";
var changed = false;


//Set current day in header
function setToday(params) {
    var today = moment().format('MMMM Do YYYY, h:mm:ss a'); 
    //console.log(today)
    $("#currentDay").append(today);
}

//create divs for every hr of the day and run other fn
function createDivs() {
    new Array(24).fill().forEach((value, index) => {
        segmentByHour.push(moment( {hour: index} ).format('h:mm A'));
    })

    for (let index = 0; index <= 23; index++) {
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
        //spanInputFnUnLocked(index);

        changeInInput[index] = false;
    }
}
 console.log(changeInInput)
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
        .text(segmentByHour[index])
        //console.log(hrP)
        //console.log(segmentByHour[index])
        $("#hr-time" + index).append(hrP)
        $(hrP).attr("id", "p-times" + index)
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
    $("#input-p" + index).text("")
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

//add butoon for the save section inside p
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
    //debugger;
}

//add <span> inside the <i> to add the lock image unlocked
/*function spanInputFnUnLocked(index) {
    var spanBtn = $("<span>").addClass("oi oi-lock-unlocked d-flex justify-content-center align-items-center i" + index)
    $("#btn-i" + index).append(spanBtn)
    $(spanBtn).attr("id", "unlocked" + index)
    //debugger;
}*/

//run main fns
setToday();

createDivs();

//on click for the <p> in the input segment change <p> to <textarea>
$(".seg-input").on("click", "p", function() {
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

    //changedInputCheck(txtp, txtF);
});


  // editable field was un-focused
  $(".seg-input").on("blur", "textarea", function() {
    // get current value of textarea
    var txt = $(this).val();
    var idTest = $(this).parent().attr("id");
    // recreate p element
    var inputP = $("<p>")
        .addClass("w-100 h-100 p-2 border border-light .bg-light shadow-sm d-flex align-items-center justify-content-center")
        .text(txt);

    // replace textarea with new content
    $(this).replaceWith(inputP);
    txtF = txt;

   

    changedInputCheck(txtp, txtF);
    if (changed == true){

        console.log("testing " + idTest)


    }
    else {
        console.log("nothing")
        var idTest = "";
    }
    
  });

  function changedInputCheck(txtp, txtF) {
    pCheck = txtp;
    fCheck = txtF;

    if (pCheck !== fCheck) {
        console.log("changed")
        changed = true;

        //unlock image
    }
    else {
        console.log("no change")
        changed = false;

        //locked image
    }
  }

  /*
  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
  var auditTask = function(taskEl) {
    // get date from task element
    var date = $(taskEl)
      .find("span")
      .text()
      .trim();
  }
  */

//////////////////////////////////////////////////////////////////////////////////////
/*
// task segment was clicked
$(".seg-input").on("click", "p", function() {
    // get current text of p element
    var text = $(this)
      .text()
      .trim();
  
    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
  
    // auto focus new element
    textInput.trigger("focus");
    console.log(textInput)
  });
  
  
  // editable field was un-focused
  $(".seg-input").on("blur", "textarea", function() {
    // get current value of textarea
    var text = $(this).val();
    console.log(text)
    /*
    // get status type and position in the list
    
    var status = $(this)
      .closest(".seg-input")
      .attr("id")
    var index = $(this)
      .closest(".seg-input")
      .index();
    
  */
    // update task in array and re-save to localstorage*/
   /* 
    tasks.text = text;
    
    
    saveTasks();
  
    //recreate p element
    var taskP = $("<p>")
      .addClass("")
      .text(text);
  
    // replace textarea with new content
    $(this).replaceWith(taskP);
    console.log(taskP)
   
  });

  // load tasks for the first time
//loadTasks();

// audit task due dates every x min
var min = 30;

setInterval(function() {
  $(".card .list-group-item").each(function() {
    auditTask($(this));
  });
}, ((60*1000)*min));
  */

//Referenced code from Module
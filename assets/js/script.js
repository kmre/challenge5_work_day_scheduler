var tasks = {};

/*var createTask = function(taskText, taskDate, taskList) {
    // create elements that make up a task item
    var taskLi = $("<li>").addClass("list-group-item");
    var taskSpan = $("<span>")
      .addClass("badge badge-primary badge-pill")
      .text(taskDate);
    var taskP = $("<p>")
      .addClass("")
      .text(taskText);
  
    // append span and p element to parent li
    taskLi.append(taskSpan, taskP);
  
    // check due date
    //auditTask(taskLi);
  
    // append to ul list on the page
    //$("#list-" + taskList).append(taskLi);
  };*/
  /*
  var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  
    // if nothing in localStorage, create a new object to track time
    if (!tasks) {
      tasks = {
        time: []
      };
    }
  
    // loop over object properties
    $.each(tasks, function(list, arr) {
      // then loop over sub-array
      arr.forEach(function(task) {
        createTask(task.text, task.date, list);
      });
    });
  };
  */
  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
  var auditTask = function(taskEl) {
    // get date from task element
    var date = $(taskEl)
      .find("span")
      .text()
      .trim();
  
    // convert to moment object at 5:00pm
    var time = moment(date, "L").set("hour", 17);
  
    // remove any old classes from element
    $(taskEl).removeClass("list-group-item-warning list-group-item-danger");
  
    // apply new class if task is near/over due date
    if (moment().isAfter(time)) {
      $(taskEl).addClass("list-group-item-danger");
    } else if (Math.abs(moment().diff(time, "days")) <= 2) {
      $(taskEl).addClass("list-group-item-warning");
    }
  };
  
//////////////////////////////////////////////////////////////////////////////////////

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
    // update task in array and re-save to localstorage
    
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
}, (60*1000)*min);
  
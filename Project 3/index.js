let tasks = [
  {
    id: 0,
    title: "Doing Laundary",
    dueDate: new Date (2020,1,28),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,23),
    deleted:false,
    note:"I need to get quarters first at Kroger."
  },
  {
    id: 1,
    title: "CS3744 Assignment 3",
    dueDate: new Date (2020,2,17),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,24),
    deleted:false,
    note:"I better start early cuz it looks pretty complicated.\r\nLooks like I have to read w3schools.com a lot."
  },
  {
    id: 2,
    title: "Getting AAA batteries",
    dueDate: null,
    completed : true, 
    completeDate : new Date (2020,2,1),
    createdDate: new Date (2020,1,26),
    deleted:false,
    note:"for my remote control."
  },
  {
    id: 3,
    title: "Booking a flight ticket ACM CHI conference",
    dueDate: new Date (2020,3,15),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,2,26),
    deleted:false,
    note:"I would have to book a flight ticket to ACM CHI conference.\r\nKeep an eye on the cancellation policy. the conference may be cancelled due to the cornoa virus outbreak. :( Although flight tickets are getting cheaper."
  }
];

let completed_task_counter = 0;

//A date function made for converting dates into the proper format
Date.prototype.formatMMDDYYYY = function(){
  var month = this.getMonth() + 1;
  var day = this.getDate();
  var year = this.getFullYear();
  
  if(month <= 9)
  {
    month = "0" + (this.getMonth());
  }

  if(day <= 9)
  {
    day = "0" + (this.getDate());
  }
  
  return month + 
  "/" +  day +
  "/" +  year;
}

//A function used for rendering the task array
function render_page()
{
  completed_task_counter = 0;
  //For rerendering the todo list table contents
  //alert("Refreshing the page!");

  //remove all stuff showing up on the tbody
  $("tbody").remove();

  // First check if a <tbody> tag exists, add one if not
  if ($("#tasks tbody").length == 0) 
  {
    $("#tasks").append("<tbody></tbody>");
  }

  for(var i = 0; i < tasks.length; i++)
  {
    //tasks should only be displayed if they are not deleted
    if(tasks[i].deleted === false)
    {

      //temp variables used to store the temporary display of certain data
      var dueDate = null;
      var createdDate = null;
      var completeDate = null;
      var title = null;
      var note = tasks[i].note.replace(/<br\s?\/?>/g,"\n");
      note = note.replace(/\r\n|\r|\n/g, "%0D%0A");
      var checkbox_status = null;
      var danger_or_success = null;

      //format title of task display whenever it is over 30 char long
      if(tasks[i].title !== null)
      {
        title = tasks[i].title;
        if(title.length >= 30)
        {
          //truncate and add ellipse...
          title = title.slice(0,30) + "...";
        }

        if(tasks[i].completed === true)
        {
          title = "<del> " + title + "</del>";
        }

      }

      else
      {
        title = "";
      }

      //If the checkbox is checked/ completed is true, then make sure we render that
      //format completed date display as long as the date is not null
      if(tasks[i].completed === true)
      {
        checkbox_status = "checked";
        danger_or_success = "success";
        completed_task_counter++;
      }

      else if(tasks[i].completed === false )
      { 
        if(tasks[i].dueDate === null)
        {
          checkbox_status = " ";
          danger_or_success = "danger";
        }

        else if(tasks[i].dueDate < new Date() )
        {
          checkbox_status = " ";
          danger_or_success = "danger";
        }
        
      }

      else
      {
        checkbox_status = " ";
        danger_or_success = " ";
      }

      //format created date display as long as the date is not null
      if(tasks[i].createdDate !== null)
      {
        createdDate = tasks[i].createdDate.formatMMDDYYYY();
        // tasks[i].createdDate = createdDate;
      }

      else
      {
        createddate = "";
      }
      
      //format due date display as long as the date is not null
      if(tasks[i].dueDate !== null)
      {
        dueDate = tasks[i].dueDate.formatMMDDYYYY();
      }

      else
      {
        dueDate = "";
      }

      //format completed date display as long as the date is not null
      if(tasks[i].completeDate !== null)
      {
        completeDate = tasks[i].completeDate.formatMMDDYYYY();
      }

      else
      {
        completeDate = "";
      }


      // Append content from task array to the table by using a loop
      $("tbody").append(
      "<tr id = " + tasks[i].id + " class = " + danger_or_success + " >" +
        "<td class = 'text-center'> <input type= 'checkbox' class='form-check-input' value=" + tasks[i].id + " " + checkbox_status + " >" + "</td>" +
        "<td class = 'text-center'>" + title + "</td>" +
        "<td class = 'text-center'> <span class = 'text-right'> <button class='btn btn-xs btn-warning' data-toggle='collapse' data-target= #note-" + tasks[i].id + "> <span class='glyphicon glyphicon-triangle-bottom'> </span> Note</button></span> </td>" +
        "<td class = 'text-center'>" + dueDate + "</td>" +
        "<td class = 'text-center'>" + completeDate + "</td>" +
        "<td class = 'text-center'> <button type= 'button' class='btn btn-danger btn-xs deletetask' alt='Delete the task' value=" + tasks[i].id + "><span class='glyphicon glyphicon-trash'></span></button> <a target='_blank' href='mailto:?body=" + note + "&amp;subject=" + tasks[i].title + "'><button type='button' class='btn btn-danger btn-xs emailtask' alt='Send an email' value=" + tasks[i].id + "><span class='glyphicon glyphicon-envelope'></span></button></a> </td>" +
      "</tr>" +
      "<tr id = note-" + tasks[i].id + " class = " + "collapse" + ">" +
        "<td></td>" +
        "<td colspan = 5>" +
          "<div class = 'well'>" +
            "<h3>" + tasks[i].title + "</h3>" +
            "<div>" + tasks[i].note + "</div>" +
          "</div>" +
        "</td>" +
      "</tr>"
      );
    }
  }

  if(completed_task_counter === 0)
  {
    $("#deleteCompletedTasks").prop('disabled', true);
  }

  else if(completed_task_counter > 0)
  {
    $("#deleteCompletedTasks").prop('disabled', false);
  }

  page_operations();
}

//A function for some operations that need to be called multiple times
function page_operations()
{

  //For Adding a new task
  $(".addtask").click(function()
  {
    //prevents user from using keyboard esc or clicking outside modal to exit the modal
    $("#myModal").modal(
    {
      backdrop: 'static', keyboard: false
    });
      
    $("#myModal").modal("show");


  });

  //When the user clicks on the "Cancel" for closing the add task modal
  $("button.btn.btn-danger.btn-default").click(function()
  {

    $("#myModal").modal("hide");

    //Used to clear any input into the textboxes 
    //Will then fill it placeholder value
    $(".modal-body [placeholder]").each(function () 
    {
      $(this).val("");
    });

    $(".modal-body [placeholder]").focus(); 

  });

  //When the user clicks on the "x" for closing the add task modal
  $("button.close").click(function()
  {
    
    //$("#myModal").modal("hide");

    //Used to clear any input into the textboxes 
    //Will then fill it placeholder value
    $(".modal-body [placeholder]").each(function () 
    {
      $(this).val("");
    });

    $(".modal-body [placeholder]").focus(); 

  });

  //When the user clicks on a checkbox
  $("input.form-check-input").click(function()
  {
    var the_box_clicked = $(this).prop("value");
    //alert("clicked the checkbox " + the_box_clicked);
    tasks[the_box_clicked].completed = !tasks[the_box_clicked].completed;

    if( tasks[the_box_clicked].completed === true)
    {
      //alert("It's been checked!" + the_box_clicked);
      tasks[the_box_clicked].completeDate = new Date();
    }

    else if( tasks[the_box_clicked].completed === false)
    {
      //alert("It's been unchecked!" + the_box_clicked);
      tasks[the_box_clicked].completeDate = null;
    }
    completed_task_counter = 0;

    render_page();

  });


  //When the user clicks on the trashcan icon
  $("button.deletetask").click(function()
  {
    var the_box_clicked = $(this).prop("value");
    //alert("clicked the trashcan " + the_box_clicked);

    var status = confirm("Are you sure you want to delete this task?");

    if(status === true)
    {
      tasks[the_box_clicked].deleted = true;
      render_page();
    }

  });


}

$(document).ready( function()
{

  render_page();

  //For clicking the overdue text
  $("#overdue").click(function()
  {
    
    $(this).toggleClass("active");

    if($("#overdue").hasClass("active") === true)
    {
      //hide all tasks that are not overdue
      $("td").parent().not(".danger, .collapse").hide();
    }

    else if($("#overdue").hasClass("active") === false)
    {
      $("td").parent().not(".danger, .collapse").show();

      if($("#hidecompleted").hasClass("active") === true)
      {
        $(".success").hide();
      }

    }

  });

  //For clicking the "Hide Completed Tasks" text
  $("#hidecompleted").click(function()
  {
    
    $(this).toggleClass("active");

    if($("#hidecompleted").hasClass("active") === true)
    {
      $(".success").hide();
    }

    else if($("#hidecompleted").hasClass("active") === false)
    {
      if( $("#overdue").hasClass("active") === false)
      {
        $(".success").show();
      }

    }

  });

  //When the user clicks on the "Submit" for closing the add task modal
  $("button.btn.btn-success.btn-default.pull-left").click(function()
  {
    let task_title = $("#task-title").val();
    let task_note = $("#task-note").val();
    let new_date = new Date($("#due-date").val() );
    // let due_date = null;
    // let due_date_day = new_date.getDate();
    // let due_date_month = new_date.getMonth() + 1;
    // let due_date_year = new_date.getFullYear();
    
    var date = false;
    var title = false;

    //check if the date entered is valid
    if(isNaN(new_date) !== true)
    {
      // if(due_date_month <= 9)
      // {
      //   due_date_month = "0" + due_date_month;
      // }

      // if(due_date_day <= 9)
      // {
      //   due_date_day = "0" + due_date_day;
      // }
      

      // alert([due_date_month, due_date_day, due_date_year].join('/'));
      // due_date = [due_date_month, due_date_day, due_date_year].join('/');
      date = true;
    }

    //if not then send an alert notifying the user of any invalid date
    else
    {
      date = false;
    }

    //check to see if the user entered a title 
    if(task_title !== "" && task_title !== null) 
    {
      title = true;
    }

    //If they didn't enter a title, alert the user.
    else
    {
      title = false;
    }

    //parse the information entered into the note section
    task_note = task_note.replace(/\r\n|\r|\n/g,"<br />");
    //alert(task_note);

    if(date === false && title === true)
    {
      alert("Please enter a valid date.");
    }

    else if(date === true && title === false)
    {
      alert("Please enter a valid title for the task first.");
    }

    else if(date === false && title === false)
    {
      alert("Please enter a valid title and date.");
    }

    //if date and title are valid, then we can submit the new task.
    else if (date === true && title === true)
    {
      alert("Your task has been processed successfully.");
      $("#myModal").modal("hide");

      //Used to clear any input into the textboxes 
      //Will then fill it placeholder value
      $(".modal-body [placeholder]").each(function () 
      {
        $(this).val("");
      });

      $(".modal-body [placeholder]").focus(); 

      //Pass the task into the array
      
      var new_Task = 
      {
        id: tasks.length,
        title: task_title,
        dueDate: new_date,
        completed : false,
        completeDate : null,
        createdDate: new Date(),
        deleted:false,
        note: task_note
      };

        if(new_Task.dueDate < new_Task.dateCreated === true)
        {
          new_Task.completed = false;
        }

      tasks.push(new_Task);


      render_page();
      
    }

  });

  //When the user clicks on the delete all completed tasks button
  $("#deleteCompletedTasks").click(function()
  {
    var num_of_tasks = " ";

    if(completed_task_counter > 1)
    {
      num_of_tasks = completed_task_counter + " tasks?";
    }

    else
    {
      num_of_tasks = completed_task_counter + " task?";
    }
    
    var status = confirm("Are you sure you want to delete " + num_of_tasks);

    if(status === true)
    {
      for(var i = 0; i < tasks.length; i++)
      {
        if(tasks[i].completed === true)
        {
          tasks[i].deleted = true;
        }
      }

      completed_task_counter = 0;
      render_page();
    }
    

  });

  // //When the user clicks on the email icon
  // $("button.emailtask").click(function()
  // {
  //   var the_box_clicked = $(this).prop("value");
  //   alert("clicked the email " + the_box_clicked);

  // });
  

});


// $("").click(function()
//   {
    
//   });
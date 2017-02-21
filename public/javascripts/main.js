
$(document).ready(function() {


//ADDING ITEMS TO PAGE AND TO DATABASE WITH AJAX CALL
  $("#add-item-button").click(function(event) { // catch the form's submit event

    event.preventDefault();

    // $("#add-item-button").prop("disabled", true);
    var checkedCategories = $(":checked").map(function(){
      return this.getAttribute("id");
    }).get();


    //CHECKING IF BOXES ARE CHECKED
    // if (($("#electronics").is(":checked") === true )  || ($("#textiles").is(":checked") === true ) || ($("#toys").is(":checked") === true ) ){
    //
    //   $("#add-item-button").prop("disabled", false);
    // }

    // $("#new-items").append("Printing item: " + $(".user-item").val() + " in category: " + checkedCategories);

    var theUserId = $("#user-id").val();

    var data = {
      name: $(".user-item").val(),
      category: checkedCategories,
      user:  theUserId //MUST BE CURRENT USER
    };

    console.log(data);

        $.ajax({      // create an AJAX call...
          data: data,   // get the data
          type: "POST", // POST
          url: "/users/api/newItem", // the file to call
          success: function(response) { // on success..
            console.log(response);
              $('#new-items').append("<p>" + response.name + "</p>"); // update the DIV
          },
          error: function(err){
            console.log("err:" + err);
          }
    });

      // return false; // cancel original event to prevent form submitting
  });


//LOG OUT!



});

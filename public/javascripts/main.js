$(document).ready(function() {





//ADDING ITEMS TO PAGE AND TO DATABASE WITH AJAX CALL
  $("#item-form").submit(function(event) { // catch the form's submit event

    event.preventDefault();

    var checkedCategories = $(":checked").map(function(){
      return this.getAttribute("id");
    }).get();

    $("#new-items").append("Printing item: " + $(".user-item").val() + " in category: " + checkedCategories);



    // $.ajax({ // create an AJAX call...
    //     data: $(this).serialize(), // get the form data
    //     type: "POST", // GET or POST
    //     url: $(this).attr('/profile'), // the file to call
    //     success: function(response) { // on success..
    //         $('#new-items').html(response); // update the DIV
    //     }
    // });

  //     return false; // cancel original event to prevent form submitting
  });


//LOG OUT!



});

$(document).ready(function() {

  //ADDING ITEMS TO PAGE AND TO DATABASE WITH AJAX CALL
  $("#add-item-button").click(function(event) { // catch the form's submit event

    event.preventDefault();

    //SEE WHICH BOXES ARE CHECKED
    var checkedCategories = $(":checked").map(function(){
      return this.getAttribute("id");
    }).get();

    //GET THE HIDDEN USER ID IN THE FORM
    var theUserId = $("#user-id").val();
    console.log(theUserId);  //THIS WORKS

    console.log('checkedCategories:', checkedCategories);
    //CREATE THE DATA OBJECT FOR AJAX
    var data = {
      name: $(".user-item").val(),
      category: checkedCategories,
      user:  theUserId //MUST BE CURRENT USER
    };

    var deleteButton = $('<button></button>');
    deleteButton.addClass("delete-item");

    // console.log(deleteButton);

    console.log(data);

        $.ajax({      // create an AJAX call...
          url: "/users/api/newItem", // the file to call
          type: "POST", // POST
          contentType: 'application/json',
          data: JSON.stringify(data),
          dataType: 'json',   // get the data
          success: function(item) { // on success..
            console.log("inside ajax call success");
            console.log(item);

            var str = `<li>${item.name}<button class='delete-item' data='${item._id}'>Delete Item</button></li></br>`;

            $('#new-items').append(str); // update the DIV
          },
          error: function(err){
            console.log("inside ajax call fail");
            console.log("err:" + err);
          }
    });


//     $.ajax({
//       url: "/users/api/newItem",                  //WORKS
//       method: "GET",
//       data: data.name,
//       // data: JSON.stringify(data),
//       dataType: 'json',
//        success: function (response) {
//             console.log("Inside get success");
//             console.log(response);
//        },
//        error: function (err) {
//        console.log(err);
//        },
// });


});

  $("body").on("click", ".delete-item",function(event) {    //Go through entire body first

    event.preventDefault();

    var theItemId = $(event.currentTarget).attr('data');


    $.ajax({      // create an AJAX call...
      url: "/users/api/oldItem/" + theItemId, // the file to call
      type: "DELETE",
       // POST
      // contentType: 'application/json',
     // get the data
      success: function(response) { // on success..
        console.log("inside ajax call success");
        console.log(response);
        console.log('delete: ', $(this));
        $(this).parent().remove(); // this = the delete button.  The parent is the list item...

      }.bind(this),
      error: function(err){
        console.log("inside ajax call fail");
        console.log(err);
      }
});


});


// mirar el button de abajo porque "button"coge toda los botones
  $(".trigger").on('click', function (event) {
    var category = $(this).attr("id");
    event.preventDefault();
    console.log(category);
      $.ajax({
        url: "/users/api/newItem/test",
        method: "GET",
        data: {category: category},
         success: function (response) {
              console.log(response);
              $("#display").empty(("<li>"));
              response.forEach(function(element){


                $("#display").append("<li>" + element.name + "</li>");

              });

         },
         error: function (err) {
         console.log(err);
         },

   });
  });



});

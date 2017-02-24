
$(document).ready(function() {

  //ADDING ITEMS TO PAGE AND TO DATABASE WITH AJAX CALL


  $("#add-item-button").click(function(event) {
    event.preventDefault();
    var checkedCategories = $(":checked").map(function(){
      return this.getAttribute("id");
    }).get();

    var theUserId = $("#user-id").val();
    console.log('checkedCategories:', checkedCategories);

    var data = {
      name: $(".user-item").val(),
      category: checkedCategories,
      user:  theUserId
    };


    var deleteButton = $('<button></button>');
    deleteButton.addClass("delete-item");



    console.log(data);

        $.ajax({
          url: "/users/api/newItem",
          type: "POST",
          contentType: 'application/json',
          data: JSON.stringify(data),
          dataType: 'json',   // get the data
          success: function(item) { // on success..
            console.log("inside ajax call success");
            console.log(item);

            var str = `<li class="table-item">${item.name}<button class='delete-item' data='${item._id}'>Delete Item</button></li>`;

            $('#new-items').append(str); // update the DIV

          },
          error: function(err){
            console.log("inside ajax call fail");
            console.log("err:" + err);
          }
    });


// <<<<<<< HEAD
//     $.ajax({
//       url: "/users/api/newItem",
//       method: "GET",
//       data: data.name,
//       dataType: 'json',
//        success: function (response) {
//             console.log("Inside get success");
//             console.log(response);
//        },
//        error: function (err) {
//        console.log(err);
//        },
//      });
//    });




});


  $("body").on("click", ".delete-item",function(event) {    //Go through entire body first

    event.preventDefault();

    var theItemId = $(event.currentTarget).attr('data');


    $.ajax({
      url: "/users/api/oldItem/" + theItemId,
      type: "DELETE",
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
      $.ajax({
        url: "/users/api/category",
        method: "GET",
        data: {category: category},
         success: function (response) {


              $("#display").empty(("<li>"));
              $("#displayUser").empty(("<div>"));
              $("#displayEmail").empty(("<a href=>"));
              response.forEach(function(element){


                $("#display").append("<li>" + element.name + "</li>");

                $.ajax({
                  url: "/users/api/name",
                  method: "GET",
                  data: {user: element.user},
                   success: function (user) {



                          $("#displayUser").append("<div><td>" + user.name + "</td></div>");
                          $("#displayEmail").append("<a href=mailto:"+ user.email+">Contact</a><br> ");
                    },
                      error: function (err) {
                        console.log(err);
                     }
                    });
                  });
                },
         error: function (err) {
         console.log(err);
       },
   });

 });

  });

$(document).ready(function(){

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


    console.log(data);

        $.ajax({
          url: "/users/api/newItem",
          type: "POST",
          contentType: 'application/json',
          data: JSON.stringify(data),
          dataType: 'json',
          success: function(response) {
            console.log("inside ajax call success");
            console.log(response);
            $('#new-items').append("<p>" + response.name + "</p>");
          },
          error: function(err){
            console.log("inside ajax call fail");
            console.log("err:" + err);
          }
    });


    $.ajax({
      url: "/users/api/newItem",
      method: "GET",
      data: data.name,
      dataType: 'json',
       success: function (response) {
            console.log("Inside get success");
            console.log(response);
       },
       error: function (err) {
       console.log(err);
       },
     });
   });

  $("#delete-item").click(function(event) {

    event.preventDefault();

    var theItemId = $("#item-id").val();


    $.ajax({
      url: "/users/api/oldItem/" + theItemId,
      type: "DELETE",
      success: function(response) {
        console.log("inside ajax call success");
        console.log(response);
        $('#new-items').remove("<p>" + response.name + "</p>");
      },
      error: function(err){
        console.log("inside ajax call fail");
        console.log(err);
      }
    });
});



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

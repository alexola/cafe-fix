$(document).ready(function() {
// mirar el button de abajo porque "button"coge toda los botones
  $("button").on('click', function (event) {
    var category = $(this).attr("id");
    event.preventDefault();
    console.log(category);
      $.ajax({
        url: "/users/api",
        method: "GET",
        data: {category: category},
         success: function (response) {
              console.log(response);
              $("#display").empty(("<li>"));
              response.forEach(function(element){
// works

                $("#display").append("<li>" + element.name + "</li>");

              });

         },
         error: function (err) {
         console.log(err);
         },

   });
  });


});

function init() {
  var pleis = {lat: 41.386,
                lng:2.1888};

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {
            lat: 41.3851,
            lng: 2.1734
        },
        zoom: 12
    });




    var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        searchBox.set('map', null);




        var places = searchBox.getPlaces();

        var bounds = new google.maps.LatLngBounds();
        var i, place;
        for (i = 0; place = places[i]; i++) {
            (function(place) {
                var marker = new google.maps.Marker({

                    position: place.geometry.location

                });

                // for each users

                // $("button").on('click', function (event) {
                //   var category = $(this).attr("id");
                //   event.preventDefault();
                //   console.log(category);
                //     $.ajax({
                //       url: "/users/api",
                //       method: "GET",
                //       data: {category: category},
                //        success: function (response) {
                //             console.log(response);
                //             $("#display").empty(("<li>"));
                //             response.forEach(function(element){
                //
                //               $("#display").append("<li>" + element.name + "</li>");
                //
                //             });
                //
                //        },
                //        error: function (err) {
                //        console.log(err);
                //        },



                //
                new google.maps.Marker({
                  position: pleis,
                  map: map
                });
                marker.addListener('click', function() {
                  map.setZoom(15);
                  map.setCenter(marker.getPosition());
                });

                marker.bindTo('map', searchBox, 'map');
                google.maps.event.addListener(marker, 'map_changed', function() {
                    if (!this.getMap()) {
                        this.unbindAll();
                    }
                });
                bounds.extend(place.geometry.location);


            }(place));

        }
        map.fitBounds(bounds);
        searchBox.set('map', map);
        map.setZoom(Math.min(map.getZoom(), 12));

    });

// searching address bar to get the geolocalization
// works to mak it work anywhere just change the searchbar id
// also use google API
// then got to connect to the user database to save the position to get thru the map

    $('#pac-input').change(function() {

// MONGODB requires LONGITUDE first when passing LONG and LAT
 var service = new google.maps.places.PlacesService(document.createElement("div"));


 var request = {
   location: {lat: 0, lng: 0},
   radius: "500",
   query: $("#pac-input").val()
 };

 service.textSearch(request, function(places){
   const lat = places[0].geometry.location.lat();
   const long = places[0].geometry.location.lng();

   $("#lat").val(lat);
   $("#long").val(long);

 });

});
}
google.maps.event.addDomListener(window, 'load', init);

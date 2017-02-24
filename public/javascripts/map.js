function init() {
  var pleis = {lat: 41.386,
                lng:2.1888};
  var yo ={
              lat: 41.3850,
              lng: 2.1730
            };

  var tu = {
            lat: 41.396716,
            lng: 2.1588186
  };
  var mathias = {
            lat: 41.403546,
            lng: 2.1894717
  };
  var charlie = {
            lat: 41.410678,
            lng:2.2263421
  };

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {
            lat: 54.5260,
            lng: 15.2551
        },
        zoom: 3
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
                  animation: google.maps.Animation.DROP,
                    position: place.geometry.location
                });
                new google.maps.Marker({
                  animation: google.maps.Animation.DROP,
                  position: pleis,
                  map: map
                });
                new google.maps.Marker({
                  animation: google.maps.Animation.DROP,
                  position: yo,
                  map: map
                });
                new google.maps.Marker({
                  animation: google.maps.Animation.DROP,
                  position:tu,
                  map:map
                });
                new google.maps.Marker({
                  animation: google.maps.Animation.DROP,
                  position:mathias,
                  map:map
                });
                new google.maps.Marker({
                  animation: google.maps.Animation.DROP,
                  position:charlie,
                  map:map
                });
                marker.addListener('click', function() {
                  map.setZoom(14);
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
    $('#pac-input').change(function() {


 var service = new google.maps.places.PlacesService(document.createElement("div"));


 var request = {
   location: {lat: 0, lng: 0},
   radius: "500",
   query: $("#pac-input").val()
 };

 service.textSearch(request, function(places) {
            const lat = places[0].geometry.location.lat();
            const long = places[0].geometry.location.lng();

            $("#lat").val(lat);
            $("#long").val(long);

  });
 });
}
google.maps.event.addDomListener(window, 'load', init);

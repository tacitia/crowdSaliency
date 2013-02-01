    var map;
    var AminY = -90;
    var AmaxY = 90;
    var AminX = -180;
    var AmaxX = 180;
    var allowedBounds = null;
    google.maps.event.addDomListener(window, 'load', initMap);
        
    // Create the Google Map…
    function initMap() {
        map = new google.maps.Map(d3.select("#googleMap").node(), {
            zoom: 11,
            center: new google.maps.LatLng(41.7, -71.45),
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        google.maps.event.addListener(map, 'zoom_changed', mapOnZoom); 
        google.maps.event.addListener(map, 'center_changed',function() { checkBounds(); });
        google.maps.event.addListener(map, 'idle', function() {
            if (!allowedBounds) {
                allowedBounds = map.getBounds();
                AmaxX = allowedBounds.getNorthEast().lng();
                AmaxY = allowedBounds.getNorthEast().lat();
                AminX = allowedBounds.getSouthWest().lng();
                AminY = allowedBounds.getSouthWest().lat();
            }
        });
    }

    function mapOnZoom() {
        console.log(map.getZoom());
    }

function checkBounds() {    
    if (! allowedBounds.contains(map.getCenter())) {
        var C = map.getCenter();
        var X = C.lng();
        var Y = C.lat();

        if (X < AminX) {X = AminX;}
        if (X > AmaxX) {X = AmaxX;}
        if (Y < AminY) {Y = AminY;}
        if (Y > AmaxY) {Y = AmaxY;}

        map.setCenter(new google.maps.LatLng(Y,X));
    }
}

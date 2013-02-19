    var map;
    var DEBUG = true;   // Draw initial map view and center marker
    var initialBounds = null;
    var centerMarker = null;
    var userMarker = null;
    var userMarkLocation = null;
    
    google.maps.event.addDomListener(window, 'load', initMap);
        
    // Providence: College Hill/Fox Point coordinates
    var ne = [41.830161, -71.389589];
    var sw = [41.820439, -71.409996];
    var centerLat = (ne[0]+sw[0])/2;
    var centerLng = (ne[1]+sw[1])/2;
    
    // Create the Google Map…
    function initMap() {
        map = new google.maps.Map(d3.select("#googleMap").node(), {
            zoom: 11,
            center: new google.maps.LatLng(centerLat, centerLng),
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });
        oldZoom = map.getZoom();
        oldCenter = map.getCenter();
        google.maps.event.addListener(map, 'zoom_changed', function() {
            recordZoomAction();
        }); 
        google.maps.event.addListener(map, 'center_changed', function() {
            recordPanAction();
            checkBounds(); 
        });
		google.maps.event.addListener(map, 'click', function(event) {
		    placeMarker(event.latLng);
            recordMarkAction(event.latLng);
	    });
                                          
        google.maps.event.addListener(map, 'idle', function() {
            // If first time loading map
            if (!initialBounds) {
                initialBounds = map.getBounds();
                var bounds = new google.maps.LatLngBounds();
                map.setZoom(100);
                
                // Extend map to include corners of desired bounding box
                bounds.extend(new google.maps.LatLng(ne[0], ne[1]));
                bounds.extend(new google.maps.LatLng(sw[0], sw[1]));
                map.fitBounds(bounds);
                initialBounds = map.getBounds();

                // Draw both the ROI and initialBounds (if DEBUG)
                var roiCoordinates = [
                    new google.maps.LatLng(ne[0], ne[1]),
                    new google.maps.LatLng(sw[0], ne[1]),
                    new google.maps.LatLng(sw[0], sw[1]),
                    new google.maps.LatLng(ne[0], sw[1]),
                    new google.maps.LatLng(ne[0], ne[1]),
                    ];
                var roiPath = new google.maps.Polyline({
                    path: roiCoordinates,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 5
                  });   
                roiPath.setMap(map);

                if (DEBUG) {
                    var initNeLat = initialBounds.getNorthEast().lat();
                    var initNeLng = initialBounds.getNorthEast().lng();
                    var initSwLat = initialBounds.getSouthWest().lat()
                    var initSwLng = initialBounds.getSouthWest().lng();

                    var initialBoundsCoordinates = [
                        new google.maps.LatLng(initNeLat, initNeLng),
                        new google.maps.LatLng(initSwLat, initNeLng),
                        new google.maps.LatLng(initSwLat, initSwLng),
                        new google.maps.LatLng(initNeLat, initSwLng),
                        new google.maps.LatLng(initNeLat, initNeLng),
                        ];
                    var initialBoundsPath = new google.maps.Polyline({
                        path: initialBoundsCoordinates,
                        strokeColor: "#0000FF",
                        strokeOpacity: 0.8,
                        strokeWeight: 5
                    });
                    initialBoundsPath.setMap(map);
                }
            }
        });
    }

    
function checkBounds() {  
    var c = map.getCenter();
    var x = c.lng();
    var y = c.lat();
    var adjust = false; // Outside bounds
    
    // Restrict center coordinates to ROI bounds and set map if outside ROI
    if (x < sw[1]) {x = sw[1]; adjust = true; }
    if (x > ne[1]) {x = ne[1]; adjust = true; }
    if (y < sw[0]) {y = sw[0]; adjust = true; }
    if (y > ne[0]) {y = ne[0]; adjust = true; }
    if (adjust) { map.setCenter(new google.maps.LatLng(y,x)); }
    
    // Draw a marker in the center of the map for debugging
    if (DEBUG) {
        if (!centerMarker) {
            centerMarker = new google.maps.Marker({
                position: map.getBounds().getCenter(),
                map: map,
                title:"Center of the map!"
            });
        } else {
            centerMarker.setPosition(map.getBounds().getCenter());
        }
    }
}

/* Place the marker for the user;
 * if the marker exists already, update its location and tooltip
 */
function placeMarker(location) {
    if (!userMarker) {
        userMarker = new google.maps.Marker({
            position: location, 
            map: map,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                fillColor: "#4444FF",
                fillOpacity: 0.8,
                strokeColor: "#000055",
                strokeOpacity: 0.9,
                strokeWeight: 3,
                scale: 12
              },
            draggable: true
        });
        updateMarkLocation(location);
        
        // Update title when dragged
        google.maps.event.addListener(userMarker, 'dragend', function(event){ 
            updateMarkLocation(this.getPosition()); 
        });
	    
    } else {
        updateMarkLocation(location);
    }
}

/* Update the position, title, and location state for the user's marker
 */
function updateMarkLocation(location) {
    userMarker.setPosition(location);
    userMarker.setTitle("Lat: " + location.lat() + ",\nLng: " + location.lng());
    userMarkerLocation = location;
    
    console.log("userMarkerLocation = " + userMarkerLocation);
}

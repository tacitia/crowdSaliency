    /*var map;
    var DEBUG = true;   // Draw initial map view and center marker
    var initialBounds = null;
    var centerMarker = null;
    var userMarker = null;
    var userMarkLocation = null;
    var mapTypeEnum = {
    	"google":1,
    	"sky":2
    };
    */
    var map;
    
    var mapTypeEnum = {
    	"google":1,
    	"sky":2
    };
    
    var imageDir = "sky_tiles_1k";    
    
    var params = getURLParams();
    console.log(params);	
    
    if (params.requestpath) {
	    imageDir = params.requestpath;
    }
    
    // action.js assumes the existence of the three vars
    var mapType = mapTypeEnum["sky"];
	  var uiVer = 1; //Not sure what different ui versions we will have
	  var userID = "steveg-test";
    
    var skyTypeOptions = {
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 4,
      minZoom: 0,
      radius: 1, // radius: 1738000 <-- from example, but what does radius do?
      name: "Deep Lens Survey",
      getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          var bound = Math.pow(2, zoom);
          var maxZoom = 3;
          var y = "y"+normalizedCoord.y;
          var x = "x"+normalizedCoord.x;
          var z = "z"+zoom;
          var url = "data/test/" + imageDir + "/"+z+"-"+x+"-"+y+".JPG";
          //var url = "data/test/tiles/"+z+"-"+x+"-"+y+".JPG";
          
          console.log("coord: " + coord);
          console.log("zoom: " + zoom);
          console.log("normalizedCoord: " + normalizedCoord.x + " " + normalizedCoord.y);
          console.log("url: " + url);
          return url;
      },
    };

    var skyMapType = new google.maps.ImageMapType(skyTypeOptions);

    function initialize() {
      var myLatlng = new google.maps.LatLng(0, 0);
      var mapOptions = {
        center: myLatlng,
        zoom: 1,
        streetViewControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ["sky"]
        }
      };

      map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);
      map.mapTypes.set('sky', skyMapType);
      map.setMapTypeId('sky');
      
      google.maps.event.addListener(map, 'zoom_changed', function() {
          console.log('zoom changed');
          recordZoomAction();
      }); 
      
      google.maps.event.addListener(map, 'center_changed', function() {
          recordPanAction();
      });
	    
	    google.maps.event.addListener(map, 'click', function(event) {
        recordMarkAction(event.latLng);
      });
    }

    // Normalizes the coords that tiles repeat across the x axis (horizontally)
    // like the standard Google map tiles.
    function getNormalizedCoord(coord, zoom) {
      var y = coord.y;
      var x = coord.x;

      // tile range in one direction range is dependent on zoom level
      // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
      var tileRange = 1 << zoom;

      // don't repeat across y-axis (vertically)
      if (y < 0 || y >= tileRange) {
        return null;
      }

      // repeat across x-axis
      if (x < 0 || x >= tileRange) {
        return null;
        //x = (x % tileRange + tileRange) % tileRange;
      }

      return {
        x: x,
        y: y
      };
    }
    
    //google.maps.event.addDomListener(window, 'load', initialize);
    
    //////////////
    // action.js assumes the existence of the three varss
    /*var mapType = mapTypeEnum["sky"];
	var uiVer = 1; //Not sure what different ui versions we will have
	var userID = "admin";
    
    //google.maps.event.addDomListener(window, 'load', initMap);
        
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

// Place the marker for the user;
// if the marker exists already, update its location and tooltip
//
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

// Update the position, title, and location state for the user's marker
//
function updateMarkLocation(location) {
    userMarker.setPosition(location);
    userMarker.setTitle("Lat: " + location.lat() + ",\nLng: " + location.lng());
    userMarkerLocation = location;
    
    console.log("userMarkerLocation = " + userMarkerLocation);
}
*/
var mouseLoc = {x: null, y: null};
var mouseTrace = "";
var sessionStartTime = new Date();
var startTime = new Date(); // the start time of a new action
var userActions = [];
var oldZoom;
var oldCenter;
document.onmousemove = recordMouseMovement;
document.onbeforeunload = postActionData;

function resetCurrentAction(currentTime) {
    mouseTrace = "";
    startTime = currentTime;
}

/**
  * Adds a json in the form of {actionName, time, actionParameter, actionString}, where
  * actionParameter = { loc: (lat, lng), lat: lat, lng: lng, mouseXY: (x, y) } 
  *
  * latLng - latLon object via Google Maps
  */
function recordMarkAction(latLng) {
    var currentTime = new Date();
    var mouseTrace = "x:" + mouseLoc.x + ",y:" + mouseLoc.y + ",time:" + 0;

/*    var actionParameter = { lat: latLng.lat(), lng: latLng.lng(), mouseX: mouseLoc.x, mouseY:
            mouseLoc.y }; */
    var actionString = "lat:" + latLng.lat() + ",lng:" + latLng.lng() + ",mouseX:" + mouseLoc.x +
            ",mouseY:" + mouseLoc.y;

    var markAction = { actionName: "mark", time: currentTime.toString(), mouseTrace: mouseTrace,
            actionParam: actionString };
    console.log(markAction);
}

function recordMouseMovement(e) {
    var currentTime = new Date();
    mouseTrace += "x:" + e.pageX + ",y:" + e.pageY + ",time:" + (currentTime - startTime) + ";";
    mouseLoc = {x: e.pageX, y: e.pageY};
}

function recordZoomAction() {
    var newZoom = map.getZoom();
    var center = map.getCenter().toString();
    var currentTime = new Date();
    var timeElapsed = currentTime - startTime;

    // construct action
//    var actionParameter = {loc: center, oldZoom: oldZoom, newZoom: newZoom};
    var actionString = "loc:" + center + ",oldZoom:" + oldZoom + ",newZoom:" + newZoom;
    var zoomAction = {actionName: "zoom", time: currentTime.toString(), timeElapsed: timeElapsed, 
            mouseTrace: mouseTrace, actionString: actionString};
    console.log(zoomAction);
    userActions.push(zoomAction);

    // update conditions
    oldZoom = newZoom;
    oldCenter = center;
    resetCurrentAction(currentTime);
}

function recordPanAction() {
    var newCenter = map.getCenter().toString();
    var zoom = map.getZoom();
    var currentTime = new Date();
    var timeElapsed = currentTime - startTime;

    // construct action
//    var actionParameter = {startLoc: oldCenter, endLoc: newCenter, zoom: zoom};
    var actionString = "startLoc:" + oldCenter + ",endLoc:" + newCenter +",zoom:" + zoom;
    var panAction = {actionName: "pan", time: currentTime.toString(), timeElapsed: timeElapsed,
    mouseTrace: mouseTrace, actionString: actionString};
    console.log(panAction);
    userActions.push(panAction);

    // update conditions
    oldCenter = newCenter;
    resetCurrentAction(currentTime);
}

function postActionData() {
    $.ajax({
        type: "POST",
        url: "../php/storeActionData.php",
        data: {actionData: userActions, sessionLength: (new Date() - sessionStartTime) / 1000},
        error: function(data) {
       console.log("Failed");
            console.log(data);
        },
        success: function(data) {
            console.log("Success");
        },
        async: false
    });	
}



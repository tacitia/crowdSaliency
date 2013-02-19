var mouseLoc = {x: null, y: null};
var mouseTrace = "";
var startTime = new Date();
var userActions = [];
var oldZoom;
var oldCenter;
document.onmousemove = recordMouseMovement;

function resetCurrentAction() {
    mouseTrace = "";
    startTime = new Date();
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

    var actionParameter = { lat: latLng.lat(), lng: latLng.lng(), mouseX: mouseLoc.x, mouseY:
            mouseLoc.y };
    var actionString = "lat:" + latLng.lat() + ",lng:" + latLng.lng() + ",mouseX:" + mouseLoc.x +
            ",mouseY:" + mouseLoc.y;

    var markAction = { actionName: "mark", time: currentTime.toString(), mouseTrace: mouseTrace,
            actionParameter: actionParameter, actionString: actionString };
    console.log(markAction);
}

function recordMouseMovement(e) {
//    if (currentActionData.mouseTrace.length > 2950) { return; }
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
    var actionParameter = {loc: center, oldZoom: oldZoom, newZoom: newZoom};
    var actionString = "loc:" + center + ",oldZoom:" + oldZoom + ",newZoom:" + newZoom;
    var zoomAction = {actionName: "zoom", time: currentTime.toString(), timeElapsed: timeElapsed, 
            mouseTrace: mouseTrace, actionParameter: actionParameter, actionString: actionString};
    console.log(zoomAction);
    userActions.push(zoomAction);

    // update conditions
    oldZoom = newZoom;
    oldCenter = center;
    resetCurrentAction();
}

function recordPanAction() {
    var newCenter = map.getCenter().toString();
    var zoom = map.getZoom();
    var currentTime = new Date();
    var timeElapsed = currentTime - startTime;

    // construct action
    var actionParameter = {startLoc: oldCenter, endLoc: newCenter, zoom: zoom};
    var actionString = "startLoc:" + oldCenter + ",endLoc:" + newCenter +",zoom:" + zoom;
    var panAction = {actionName: "pan", time: currentTime.toString(), timeElapsed: timeElapsed,
    mouseTrace: mouseTrace, actionParameter: actionParameter, actionString: actionString};
    console.log(panAction);
    userActions.push(panAction);

    // update conditions
    oldCenter = newCenter;
    resetCurrentAction(currentTime);
}



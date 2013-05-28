var mouseLoc = {x: null, y: null};
var mouseTrace = "";
var sessionStartTime = new Date();
var startTime = new Date(); // the start time of a new action
var userActions = [];
var oldZoom;
var oldCenter;
var workerId = getURLParameter('workerId');

document.onmousemove = recordMouseMovement;
window.onbeforeunload = postActionData;

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
//    var mouseTrace = "x:" + mouseLoc.x + ",y:" + mouseLoc.y + ",time:" + 0;
    var timeElapsed = currentTime - startTime;

/*    var actionParameter = { lat: latLng.lat(), lng: latLng.lng(), mouseX: mouseLoc.x, mouseY: mouseLoc.y }; */
    var actionString = "loc:" + latLng + ",mouseX:" + mouseLoc.x + ",mouseY:" + mouseLoc.y;

    var markAction = { actionName: "mark", time: currentTime.toString(), timeElapsed: timeElapsed, 
    		mouseTrace: mouseTrace, actionParam: actionString};
    console.log(markAction);
    userActions.push(markAction);
    
    resetCurrentAction(currentTime);
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
            mouseTrace: mouseTrace, actionParam: actionString};
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
    mouseTrace: mouseTrace, actionParam: actionString};
    console.log(panAction);
    userActions.push(panAction);

    // update conditions
    oldCenter = newCenter;
    resetCurrentAction(currentTime);
}

function postActionData() {
	var id = (workerId === undefined) ? userID : workerId;
	var rid = getURLParameter('requesetpath');
	rid = (rid === undefined) ? 'sky_tiles_1k' : rid;
	
    $.ajax({
        type: "POST",
        url: "php/storeActionData.php",
        data: {actionData: userActions, sessionLength: (new Date() - sessionStartTime) / 1000, mapType: mapType, uiVer: uiVer, userID: id, requestID: rid},
        error: function(data) {
       console.log("Failed");
            console.log(data);
        },
        success: function(data) {
            console.log("Success");
            console.log(data);
        },
        async: false
    });
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
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

function recordMouseMovement(e) {
//    if (currentActionData.mouseTrace.length > 2950) { return; }
    var currentTime = new Date();
    currentActionData.mouseTrace += "x:" + e.pageX + ",y:" + e.pageY + 
                                    ",time:" + (currentTime - startTime) + ";";
}

function recordZoomAction() {
    var newZoom = map.getZoom();
    var center = map.getCenter().toString();
    var currentTime = new Date();
    var timeElapsed = currentTime - startTime;

    // construct action
    var actionParameter = {loc: center, oldZoom: oldZoom, newZoom: newZoom};
    var actionString = "loc:" + center + ",oldZoom:" + oldZoom + ",newZoom:" + newZoom;
    var zoomAction = {actionName: "zoom", time: currentTime.toString(), timeElapsed: mouseTrace: mouseTrace, 
    actionParameter: actionParameter, actionString: actionString};
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
    var timeElapsed = new Date() - startTime;

    // construct action
    var actionParameter = {startLoc: oldCenter, endLoc: newCenter, zoom: zoom};
    var actionString = "startLoc:" + oldCenter + ",endLoc:" + newCenter +",zoom:" + zoom;
    var panAction = {actionName: "pan", time: new Date().toString(), mouseTrace: mouseTrace,
    actionParameter: actionParameter, actionString: actionString};
    console.log(panAction);
    userActions.push(panAction);

    // update conditions
    oldCenter = newCenter;
    resetCurrentAction(currentTime);
}



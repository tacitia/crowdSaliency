$(document).ready(function() {
	$('#turkerID') = "Worker ID: " + util.getTurkerID();
	$('#assignmentID') = "Assignment ID: " + util.getAssignmentID();
	$('#hitID') = "HIT ID: " + util.getHitID();
	$('#previewMode') = "Is preview mode: " + ( util.checkPreviewMode() ? "true" : "false");
});

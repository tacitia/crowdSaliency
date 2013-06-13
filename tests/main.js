$(document).ready(function() {
	$('#turkerID').text("Worker ID: " + util.getTurkerID());
	$('#assignmentID').text("Assignment ID: " + util.getAssignmentID());
	$('#hitID').text("HIT ID: " + util.getHitID());
	$('#previewMode').text("Is preview mode: " + ( util.checkPreviewMode() ? "true" : "false"));
});

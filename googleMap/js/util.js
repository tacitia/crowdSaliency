(function(util, $, undefined) {
	var params = undefined;
	
	var getTurkerID = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.workerId;	
	}
	
	var getAssignmentID = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.assignmentId;
	}

	var getHitID = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.hitId;
	}
	
	
	var getSubmitTo = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.turkSubmitTo + "/mturk/externalSubmit?assignmentId=" + params.assignmentId;
	}
	
	var checkPreviewMode = function() {
		if (params === undefined) { params = getURLParams(); }
		return (params.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE");
	}
	
	function getURLParams() {
		var params = {};
		var m = window.location.href.match(/[\\?&]([^=]+)=([^&#]*)/g);
		if (m) {
			for (var i = 0; i < m.length; i++) {
				var a = m[i].match(/.([^=]+)=(.*)/);
				params[unescapeURL(a[1])] = unescapeURL(a[2]);
			}
		}
		return params;
	}
	
})(window.util = window.util || {}, jQuery);
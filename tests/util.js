(function(util, $, undefined) {
	var params = undefined;
	
	util.getTurkerID = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.workerId;	
	};
	
	util.getAssignmentID = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.assignmentId;
	};

	util.getHitID = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.hitId;
	};
	
	
	util.getSubmitTo = function() {
		if (params === undefined) { params = getURLParams(); }
		return params.turkSubmitTo + "/mturk/externalSubmit";
	};
	
	util.checkPreviewMode = function() {
		if (params === undefined) { params = getURLParams(); }
		return (params.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE");
	};
	
	util.appendSubmitForm = function() {
		$('body').append('<div id="submitDiv"><form id="submitForm"></form></div>');
		var mturkSubmitDiv = $('#submitDiv');
		var mturkSubmitForm = $('#submitForm');
		mturkSubmitForm.append('<input type="hidden" name="assignmentId" id="assignmentId"');
		mturkSubmitForm.append('<div style="display:inline-block;"><input type="submit" value="Submit"/></div>');
		mturkSubmitForm.attr('method', 'POST')
		var submitTo = util.getSubmitTo();
		mturkSubmitForm.attr('action', submitTo);
		var assignmentId = util.getAssignmentID();
        $('#assignmentId').attr('value', assignmentId);
		
		mturkSubmitDiv.css('width', '90%');
		mturkSubmitDiv.css('height', 'auto');
		mturkSubmitDiv.css('margin', '0 auto');
		mturkSubmitDiv.css('text-align', 'center');
		mturkSubmitForm.css('display', 'inline-block');
	};
	
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

	function unescapeURL(s) {
		return decodeURIComponent(s.replace(/\+/g, "%20"))
	}
	
})(window.util = window.util || {}, jQuery);
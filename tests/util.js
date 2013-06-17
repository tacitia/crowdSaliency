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
		return params.turkSubmitTo + "/mturk/externalSubmit?assignmentId=" + params.assignmentId;
	};
	
	util.checkPreviewMode = function() {
		if (params === undefined) { params = getURLParams(); }
		return (params.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE");
	};
	
	util.appendSubmitForm = function() {
		var mturkSubmitForm = $('form').appendTo($('div').appendTo($('body'));
		mturkSubmitForm.append('<div><input type="submit" value="Submit"/></div>');
		mturkSubmitForm.attr('method', 'POST')
		var submitTo = util.getSubmitTo();
		mturkSubmitForm.attr('action', submitTo);
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
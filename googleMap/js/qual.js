	var workerId = 'test';
	var isTest = false;
	
	$(document).ready(function() {
		// Redirect immediately if in preview mode
		if (params.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
			redirectToTask();
		}
		
		// Otherwise, get worker Id and see if this worker has taken the survey before	
		if (!isTest) {
			workerId = params.workerId;
		}
		checkQual();

		$('#submit_btn').click(storeQualResult);
	});
	
	function storeQualResult() {
		var q1answer = $('[name="q1answer"]')[0].value;
		var q2answer = $('[name="q2answer"]')[0].value;
		var q3answer = $('[name="q3answer"]')[0].value;
		$.ajax({
			type: "POST",
			url: "php/storeQualResult.php",
			data: {workerId: workerId, q1answer: q1answer, q2answer: q2answer, q3answer: q3answer},
		    error: function(data) {
       			console.log("Failed");
            	console.log(data);
        	},
        	success: function(data) {
            	console.log("Success");
           	    redirectToTask();
            },
            async: false	
			
		});
	}

	function checkQual() {
    	$.ajax({
        	type: "POST",
     	    url: "php/checkQual.php",
       		data: {workerId: workerId},
        	error: function(data) {
       			console.log("Failed");
            	console.log(data);
        	},
        	success: function(hasWorkerProfile) {
            	console.log("Success");
           	    if (hasWorkerProfile == 1) {
					redirectToTask();
				}
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
	
	function redirectToTask() {
		var sPageURL = window.location.search.substring(1);
		window.location.replace('map-sky-test.html?' + sPageURL);
	}
	
	//TODO: add a function that validates user qual input
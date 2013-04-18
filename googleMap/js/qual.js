	var workerId = 'test';
	var isTest = false;
	
	$(document).ready(function() {
		if (!isTest) {
			workerId = getURLParameter('workerId');
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
           	    console.log(data);
                return data;
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
			    	var sPageURL = window.location.search.substring(1);
					window.location.replace('map-sky-test.html?' + sPageURL);
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
	
	//TODO: add a function that validates user qual input
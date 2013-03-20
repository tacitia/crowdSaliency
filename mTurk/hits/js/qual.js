	$(document).ready(function() {
		var userQualified = true;
	
		if (userQualified) {
	    	var sPageURL = window.location.search.substring(1);
	    	alert(sPageURL);
			window.location.replace('template.html?' + sPageURL);
		}
	});

	function checkQual() {
		var workerId = getURLParameter('workerId');
    	$.ajax({
        	type: "POST",
     	    url: "../hits/php/checkQual.php",
       		data: {workerId: workerId},
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
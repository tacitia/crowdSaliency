function getAccountBalance() {
	console.log('GetAccountBalance triggered');

	var service = 'AWSMechanicalTurkRequester';
	var operation = 'GetAccountBalance';
	var timestamp = ISODateString(new Date());

	var hash = CryptoJS.HmacSHA256(service + operation + timestamp, secretKey);
	var base64 = hash.toString(CryptoJS.enc.Base64);

	console.log(service + operation + timestamp);
	console.log(hash);
	console.log(base64);

	$.ajax({
		type: 'GET',
		url: 'https://mechanicalturk.amazonaws.com/',
		data: {Service: service, 
				AWSAccessKeyId: accessKey,
				Version: version,
				Operation: operation,
				Signature: base64,
				Timestamp: timestamp
				},
		error: function(data) {
			console.log("Error:");
			console.log(data);
		},
		success: function(data) {
			console.log("Success:");
			console.log(data);
		}
	});
}

function ISODateString(d){
	function pad(n) {  return n<10 ? '0'+n : n  }
 	return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds() + 2)+'Z'
}
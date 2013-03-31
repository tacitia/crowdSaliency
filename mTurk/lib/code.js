    // asking people to improve a description for an image
for (var i = 0; i < 5; ++i) {    
    // create a HIT on MTurk using the webpage
    var hitId = mturk.createHIT({
        title : "Navigate large images",
        desc : "Find objects specified in the instruction.",
        url : "http://crowdvis.cs.brown.edu/crowdSaliency/mTurk/hits/qual.html",
        height : 800,
        reward : 0.02,
	assignments : 1
    })
}
var text = "...please improve me..."

for (var i = 0; i < 5; i++) {

    // asking people to improve a description for an image
    
    // create a HIT on MTurk using the webpage
    var hitId = mturk.createHIT({
        title : "Navigate large images",
        desc : "Find objects specified in the instruction.",
        url : "http://hivizexplorer.com/mturk/crowdSaliency/qual.html",
        height : 800,
        reward : 0.02,
	assignments : 20
    })
    
    // wait for the HIT to be done,
    // (NOTE: the program will probably stop here
    // the first time it is executed,
    // since people will not have had
    // a chance yet to complete the HIT)
    var hit = mturk.waitForHIT(hitId)
    
    // get the new text from the hit, and display it
    var newText = hit.assignments[0].answer.newText
    print("-------------------")
    print(newText)
    print("-------------------")
    
    // generate HTML highlighting the differences between the texts
    var diff = highlightDiff(text, newText)
    
    // create an HTML page on S3
    // asking people to vote between the two versions
    var votePage = createWebpageFromTemplate(("" + <div>
            <img src="http://groups.csail.mit.edu/uid/turkit/www/nut_people.jpg" alt="description not available"></img>    
            <ul>
                <li>Please choose the better description for this image.</li>
            </ul>
            
            <table class="random">
                <tr>
                    <td><input name="voteA" type="submit" value="&gt;" style="width:30px;height:50px"></input></td>
                    <td><pre style="width:500px;border:thin solid; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -o-pre-wrap;">___DIFF_A___</pre></td></tr>
            </table>
            
            <table class="random">
                <tr>
                    <td><input name="voteB" type="submit" value="&gt;" style="width:30px;height:50px"></input></td>
                    <td><pre style="width:500px;border:thin solid; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -o-pre-wrap;">___DIFF_B___</pre></td></tr>
            </table>
        </div>).replace(/___DIFF_A___/g, diff.a).replace(/___DIFF_B___/g, diff.b),
        // this is where we prohibit the person who wrote this passage from voting on it (it is the second parameter to createWebpageFromTemplate, which can also be an array of workerId's if we want to block multiple workers
        hit.assignments[0].workerId)
    
    // create a HIT on MTurk using this page
    var voteId = mturk.createHIT({
        title : "Vote on Text Improvement",
        desc : "Decide which two small paragraphs is closer to a goal.",
        url : votePage,
        height : 800,
        reward : 0.01,
        assignments : 2
    })
    
    // we gave the HIT 2 assignments,
    // which will get 2 votes,
    // but if these votes disagree,
    // then we'll want a 3rd vote,
    // so we use the utility function "mturk.vote"
    // to handle this.
    var voteResults = mturk.vote(voteId, function (answer) {return answer.voteA ? "old" : "new"})
    
    // decide what to do depending on how people voted
    if (voteResults.bestOption == "new") {
        text = newText
        mturk.approveAssignment(hit.assignments[0])
        print("\nvote = keep\n")
    } else {
        mturk.rejectAssignment(hit.assignments[0])
        print("\nvote = reject\n")
    }
    
    // clean up after ourselves...
    
    // first, let's delete the original HIT
    mturk.deleteHIT(hit)
    // NOTE: we don't need to delete the vote HIT,
    // this happens inside mturk.vote
    
    // we also created a couple pages on S3,
    // so delete them
    s3.deleteObject(webpage)
    s3.deleteObject(votePage)
}
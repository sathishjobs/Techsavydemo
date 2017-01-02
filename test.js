http://eloquentjavascript.net/09_regexp.html


function fillterWord(speechText){
	var pattern = new RegExp("anal");
	console.log(pattern);
	if(pattern.test(speechText)){
		console.log("analance detected");
    } else {
		console.log("analance not detected");
    }

}

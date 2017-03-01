// ==UserScript==
// @name         5278.cc - Translate
// @version      0.1
// @description  Translates the titles using the google translate api (Google Chrome)
// @author       Ayahuasc0re
// @updateURL	 https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_Translate.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_Translate.js
// @match        http://www.5278.cc/forum.php?mod=viewthread*
// @grant        none
// @run-at       document-end
// ==/UserScript==

var xhr = new XMLHttpRequest();
initiateQuery();
// var observer = new WebKitMutationObserver(function() {initiateQuery();});
// observer.observe(document.body, {childList:true, subtree:true});

function httpRequest(queryURL) {
    xhr.open("GET", queryURL, true);
    xhr.onload = function (e) {
        callBack();
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
	console.error("Error in httpRequest Function.");
	// location.reload();
    };
    xhr.send(null);
}

function initiateQuery() {
    try {
        var title = document.querySelector("#thread_subject").innerHTML;
        console.log("Title: " + title);
    	var queryURL = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURI(title);
    	if (queryURL) {
        	// console.log("queryURL: " + queryURL);
        	httpRequest(queryURL);
    	}
    }
    catch(e) {
    	console.error(e);
        console.error("Error in initiateQuery Function.");
    	// location.reload();
    }
}

function callBack() {
    // console.log("Callback!!!");
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var response = xhr.responseText;
            console.log("response: " + response);
            if (response) {
                // Regex Version
                /*
                var regex = /\[{3}"(.+)?","/g;
                var translatedText = regex.exec(response)[1];
                console.log("translatedText: " + translatedText);
                document.querySelector("#thread_subject").innerHTML += "<br/>" + translatedText;
                **/
                // JSON Version
                var validJSON = response.replace(/,+/g, ",").replace(/\[,/g, "[");
                var JSONObject = JSON.parse(validJSON);
                var translatedText = JSONObject[0][0][0];
                console.log("translatedText: " + translatedText);
                document.querySelector("#thread_subject").innerHTML += "<br/>" + translatedText;
            }
        } else {
            console.error(xhr.statusText);
            return false;
        }
    }
}

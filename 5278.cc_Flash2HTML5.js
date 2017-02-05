// ==UserScript==
// @name         5278.cc Flash to HTML5 - AJAX Version
// @version      0.1.1
// @description  Converts Flash to HTML5 and makes a download possible. No Flash required!
// @author       Ayahuasc0re
// @updateURL	 https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_Flash2HTML5.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_Flash2HTML5.js
// @match        http://new.qqqbox.com/*/player3.php?id=*
// @match        http://hbo.hboav.com/*/player3.php?id=*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

var xhr = new XMLHttpRequest();
var safetyCount = 0;
var observer = new WebKitMutationObserver(function() {initiateQuery();});
observer.observe(document.body, {childList:true, subtree:true});

function httpRequest(queryURL) {
    xhr.open("GET", queryURL, true);
    xhr.onload = function (e) {
        callBack();
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

function initiateQuery() {
    safetyCount++;
    var queryURL = document.body.innerHTML.match(/get3\.php\?rand\=.+\&ref\=/g)[0] + document.location.hostname;
    if (queryURL) {
        observer.disconnect();
        console.log("queryURL: " + queryURL);
        httpRequest(queryURL);
    }
    if (safetyCount >= 20) {
        observer.disconnect();
        console.log("OBSERVER REMOVED AFTER safetyCount: " + safetyCount);
        return false;
    }
}

function callBack() {
    console.log("Callback!!!");
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var response = xhr.responseText;
            if (response) {
                console.log("response: " + response);
                var cmdRegex = /var\sccsJsCmds\s\=\s'(.+)';/g;
                var cssJsCmdsX = cmdRegex.exec(response)[1];
                console.log("cssJsCmdsX: " + cssJsCmdsX);
                var flashvars = unescape(myencryptHTML(cssJsCmdsX));
                console.log("flashvars: " + flashvars);
                var vidRegex = /file\:\s"(.+)"/g;
                var vidURL = vidRegex.exec(flashvars)[1];
                if (vidURL.charAt(0) === "/") vidURL = "http://" + document.location.hostname + vidURL;
                if (vidURL.match(/[\d\w]+\.flv/g)) vidURL = vidURL.replace(/\.flv/g, ".mp4");
                console.log("vidURL: " + vidURL);
                if (vidURL.match(/[\d\w]+\.mp4/g)) createDownloadButton(vidURL);
            }
        } else {
            console.error(xhr.statusText);
            return false;
        }
    }
}

/*
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}
**/

function createDownloadButton(vidURL) {
    // document.querySelector("#mediaplayer_jwplayer_controlbar_durationText").onclick = function () { downloadURI(vidURL, vidURL.match(/[\d\w]+\.mp4/g)); };
    document.body.innerHTML = '<a id="download_video" " title="Download Video" href="' + vidURL + '"><i>PLAY VIDEO</i></a>';
}

/*
// decrypt5278 = offline mirror of myencryptHTML function
function decrypt5278(s) {
	var sRet="";
	for(j=0; j< s.length; j++ ) {
		var n = s.charCodeAt(j);
		if (n >= 8364) {
			n = 128;
		}
		sRet += String.fromCharCode(n - 1);
	}
	return(sRet);
}
**/


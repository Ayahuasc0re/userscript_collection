// ==UserScript==
// @name         fxpan.com - Direct Download
// @version      0.1.0
// @description  Makes a download possible without the need for an account
// @author       Ayahuasc0re
// @updateURL    https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/fxpan.com_directDownload.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/fxpan.com_directDownload.js
// @match        https://www.fxpan.com/share/*
// @match        https://fxpan.com/share/*
// @match        http://www.fxpan.com/share/*
// @match        http://fxpan.com/share/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

function httpRequestPost(queryURL, data, callBackFunction) {
    xhr.open("POST", queryURL, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function (e) {
        callBackFunction();
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(data);
}

function firstCallBack() {
    // console.log("First Callback!");
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var response = xhr.responseText;
            if (response) {
                console.log("response:\n" + response);
                var regex = /href="(http\:\/\/dl.+\.fxpan.com\/dl\.php\?.+?)"/g;
                var downloadURL = regex.exec(response)[1];
                var fileName = document.querySelector("h1").innerText;
                console.log("downloadURL:\n" + downloadURL);
                createDownloadButton(downloadURL, fileName);
            }
        } else {
            console.error(xhr.statusText);
            return false;
        }
    }
}

function createDownloadButton(downloadURL, fileName) {
    try {
        document.body.innerHTML = '<a id="download_file" " title="Download" href="' + downloadURL + '"><i>DOWNLOAD:</br>' + fileID + ' - ' + fileName + '</i></a>';
    }
    catch(e) {
        windwow.onload(document.body.innerHTML = '<a id="download_file" " title="Download" href="' + downloadURL + '"><i>DOWNLOAD:</br>' + fileID + ' - ' + fileName + '</i></a>');
    }
}

function initFunction() {
    fileID = document.querySelector("#id").value;
    console.log("fileID: " + fileID);
    httpRequestPost(document.location.protocol + "//" + document.location.host + "/ajax.php", "action=load_down_addr1&file_id=" + fileID, firstCallBack);
}

function createXHR() {
    try {
        return new XMLHttpRequest();
    } catch (e) {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
}

// console.log("START");
var fileID;
var xhr = createXHR();
initFunction();

/*
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}
**/


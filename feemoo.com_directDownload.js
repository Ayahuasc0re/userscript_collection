// ==UserScript==
// @name         feemoo.com - Direct Download
// @version      0.2.2
// @description  Makes a download possible without the need for an account
// @author       Ayahuasc0re
// @updateURL    https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/feemoo.com_directDownload.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/feemoo.com_directDownload.js
// @match        https://www.feemoo.com/file-*.html
// @match        https://feemoo.com/file-*.html
// @grant        none
// @run-at       document-start
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

function httpRequestGet(queryURL, callBackFunction) {
    xhr.open("GET", queryURL, true);
    xhr.onload = function (e) {
        callBackFunction();
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

function firstCallBack() {
    // console.log("First Callback!");
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var response = xhr.responseText;
            if (response) {
                console.log("response:\n" + response);
                var regex = /href="(fmdown\.php\?.+?)"/g;
                var secondRequestURL = "https://" + document.location.host + "/" + regex.exec(response)[1];
                console.log("secondRequestURL:\n" + secondRequestURL);
                xhr = createXHR();
                httpRequestGet(secondRequestURL, secondCallBack);
            }
        } else {
            console.error(xhr.statusText);
            return false;
        }
    }
}

function secondCallBack() {
    // console.log("Second Callback!");
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var response = xhr.responseText;
            if (response) {
                // console.log("Final Website:\n" + response);
                var regexURL = /var\sfile_url=\s'(.+)'/g;
                var regexName = /<title>(.+)\s-\s下载页面\s-\s飞猫网盘<\/title>/g;
                var downloadURL = regexURL.exec(response)[1];
                var fileName = regexName.exec(response)[1];
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
    fileID = document.location.pathname.match(/\d{6}/g)[0];
    console.log("fileID: " + fileID);
    httpRequestPost("https://" + document.location.host + "/yythems_ajax_file.php", "action=load_down_addr2&file_id=" + fileID, firstCallBack);
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

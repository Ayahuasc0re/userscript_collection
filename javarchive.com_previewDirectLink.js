// ==UserScript==
// @name         javarchive.com - Preview Direct-Link
// @version      0.3
// @description  Adds a direct link to the pixhost preview on javarchive.org
// @author       Ayahuasc0re
// @updateURL    https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/javarchive.com_previewDirectLink.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/javarchive.com_previewDirectLink.js
// @match        http://javarchive.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    try {
        var postContent = document.querySelectorAll(".post-content")[0];
        // postContent.innerHTML = postContent.innerHTML.replace("http://www.pixhost.org/show", "http://img8.pixhost.org/images");
        // Regex has to be used to replace ALL occurences!
        // postContent.innerHTML = postContent.innerHTML.replace(/www\.pixhost\.org\/show/g, "img8.pixhost.org/images");
        // postContent.innerHTML = postContent.innerHTML.replace(/(www|t8)\.pixhost\.org\/(show|thumbs)/g, "img8.pixhost.org/images");
        // Correct hyperlink now?
        postContent.innerHTML = postContent.innerHTML.replace(/((www|t8)\.)?pixhost\.org\/(show|thumbs)/g, "img8.pixhost.org/images");
    }
    catch(err) {
        console.log(err.message);
    }
})();

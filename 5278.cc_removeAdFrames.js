// ==UserScript==
// @name         5278.cc - Remove Ad-Frames
// @version      0.2
// @description  Remove all Iframe Ads
// @author       Ayahuasca
// @updateURL	 https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_removeAdFrames.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_removeAdFrames.js
// @match        http://www.5278.cc/forum.php?*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].id != "allmyplayer") {
            iframes[i].parentNode.removeChild(iframes[i]);
        }
    }
})();

// ==UserScript==
// @name         5278.cc - Automatic Redirect
// @version      0.1
// @description  5278.cc - Automatic Redirect
// @author       Ayahuasc0re
// @updateURL	 https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_automaticRedirect.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/5278.cc_automaticRedirect.js
// @match        http://www.5278.cc/agree.php*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var urlx = document.location.href;
    if (urlx.match(/adult=agreed/)) {
        return false;
    }
    else {
        window.top.location.replace(urlx + "&adult=agreed");
        return true;
    }
})();

// ==UserScript==
// @name         IMDb Movie Rating for Xrel.to
// @version      0.1
// @description  IMDb Movie Rating for Xrel.to
// @author       Ayahuasc0re
// @updateURL    https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/xrel.to_IMDbMovieRating.js
// @downloadURL  https://raw.githubusercontent.com/ayahuasc0re/userscript_collection/master/xrel.to_IMDbMovieRating.js
// @match        https://www.xrel.to/movie/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var response;
    var movietitle;
    var IMDbID;
    var queryURL;
    var boxContent;
    try {
        // IMDbID = document.querySelectorAll('.box_list2_right > a')[2].title.match(/tt\d+/g);
        IMDbID = document.querySelectorAll('.box_content.clear')[0].innerHTML.match(/tt\d+/g);
        console.log("IMDb-ID: " + IMDbID);
        queryURL = "https://www.omdbapi.com/?i=" + IMDbID + "&plot=short&r=json";
    }
    catch(err) {
        // console.log(err.message);
        try {
            movietitle = document.querySelector("#extinfo_title > span").innerHTML.replace(/[@#$%^&*();:\/\\|<>]/g,"");
        }
        catch(err2) {
            //console.log(err2.message);
            console.log("Original Movie Title not found! Using German Title instead.");
            movietitle = document.querySelector("#extinfo_title > h3").innerHTML.replace(/[@#$%^&*();:\/\\|<>]/g, "");
        }
        console.log('Movie Title: ' + movietitle);
        console.log("IMDB-ID not found!.");
        queryURL = "https://www.omdbapi.com/?t=" + movietitle.replace(/ /g, "+") + "&y=&plot=short&r=json";
    }
    console.log('Query-URL: ' + queryURL);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", queryURL, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                response = xhr.responseText;
                var json = JSON.parse(response);
                window.IMDbRating = json.imdbRating;
                window.IMDbVotes = json.imdbVotes;
                console.log('IMDb-Rating: ' + IMDbRating);
                console.log('IMDb-Votes: ' + IMDbVotes);
                boxContent = document.querySelector("#center1 > .middle_left > .box1 > .box_content");
                boxContent.innerHTML += '<div class="horiz_line_dotted"></div> <div class="l_left"><a href="http://www.imdb.com/title/' + IMDbID + '/">IMDb</a> (' + IMDbVotes + ' Votes):</div> <div class="extinfo_top_rank">' + IMDbRating + '</div> <div class="clear"></div>';
                //console.log(response);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
})();

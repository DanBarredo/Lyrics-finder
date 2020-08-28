const form = document.querySelector(".search-container");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const lyrics = document.querySelector(".lyrics");

var searchQuery = {
    artist: artist.value,
    title: title.value
}

// *** EVENT LISTENERS ***
// load page
window.addEventListener("DOMContentLoaded", resetSearch);

// search form
form.addEventListener("submit", function(e) {
    e.preventDefault();

    var searchQuery = {
        artist: artist.value,
        title: title.value
    }
    if (!searchQuery.artist && !searchQuery.title) {
        console.log("both inputs empty");
        alertMessage("please enter an artist and song title", "fail");
    }
    if (!searchQuery.artist) {
        console.log("artist search empty");
        alertMessage("please enter an artist", "fail");
    }
    if (!searchQuery.title) {
        console.log("title search empty");
        alertMessage("please enter a song title", "fail");
    } else {
        // alertMessage("found some Lyrics", "success");
        searchLyrics(searchQuery);
    }
});

// *** FUNCTIONS ***

function searchLyrics(searchQuery) {
    var url = buildURL(searchQuery.artist, searchQuery.title);
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            // console.log('Body:', this.responseText);
            if (request.status == 404) {
                console.log("error, nothing found");
                alertMessage("Couldn't find any lyrics! try again", "fail");
            } else {
                alertMessage("found some Lyrics", "success");
                $.get(url, function(data) {
                    lyrics.innerHTML = getSongDetails() + data.lyrics.replace(new RegExp("\n", "g"), "<br>");
                });
            }
        }
    };
    request.send();
}

function buildURL(artist, title) {
    return ('https://api.lyrics.ovh/v1/' + artist + '/' + title);
}

function getSongDetails() {
    return `<h3>${artist.value} - ${title.value}</h3>`;
}

function resetSearch() {
    artist.value = "";
    title.value = "";
}

function alertMessage(msg, status) {
    alert = form.querySelector(".alert");
    alert.classList.add(`alert-${status}`)
    alert.textContent = msg;
    alert.classList.add(`alert-${status}`);

    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${status}`);
        // alert.style.height = 0;
    }, 1800);
}

// Scrollbars
$(document).ready(function() {
    $("body").niceScroll();
    $("article").niceScroll(
        {
            cursorcolor: "#1d386b",
            autohidemode: false,
        }
    );
});

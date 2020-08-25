const form = document.querySelector(".search-container");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const lyrics = document.querySelector(".lyrics");


var searchQuery = {artist:artist.value, title: title.value}

// *** EVENT LISTENERS ***
// load page
window.addEventListener("DOMContentLoaded", resetSearch);

// search form
form.addEventListener("submit", function(e) {
    e.preventDefault();

    var searchQuery = {artist:artist.value, title: title.value}
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
    }
    else {
        alertMessage("found some Lyrics", "success");
        searchLyrics(searchQuery);
    }
});


// *** FUNCTIONS ***

function searchLyrics(searchQuery) {
    $.get("https://api.lyrics.ovh/v1/" + searchQuery.artist + "/" + searchQuery.title,
        function(data) {
            lyrics.innerHTML = getSongDetails() + data.lyrics.replace(new RegExp("\n", "g"),"<br>");
        });
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
    }, 1500);
}

var FREQUENCY = 500;

var lyrics = [
    [10,"halloi"],
    [19,"shout out to kmj"],
    [20,"han var en top notch ulær i fra back in the day"],
    [25,"bor fortsatt borti gata"],
    [26,"rapping away"],
    [30,"???"],
    [35,"men jeg lever for noen kroner og ei beta"]
]

function getNextLine(time) {
    var pastLines = lyrics.filter(function(l) {return l[0] < time});
    if (pastLines.length) {
        return pastLines[pastLines.length - 1][1];
    }
    return "";
}

function display(text, element) {
    element.innerHTML = text;
}

function displayLyrics(player, line) {
    var next = getNextLine(player.currentTime)
    console.log(player.currentTime, next);
    display(next, line);
}

document.addEventListener("DOMContentLoaded", function(event) { 
    var line = document.getElementById("line");
    var player = document.getElementById("player");

    var intervalId;

    player.addEventListener("playing", function() { intervalId = setInterval(function() { displayLyrics(player, line) }, FREQUENCY) } );
    player.addEventListener("pause", function() { clearInterval(intervalId) } );
    
    setInterval(function() {
        var text = next != undefined ?  next[1] : ""
        lyric.innerHTML = text;
    }, 10000000)
})  
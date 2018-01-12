var FREQUENCY = 100;

function parseLyrics(lyrics) {
    var lines = lyrics.split("\n");
    return lines.map(function(line) {
        var words = line.split(";");
        var time = Number(words[0]);
        var line = words[1];
        var cls= words[2] || "";
        return { time: time, line: line, cls: cls }
    });
}

function getNextLine(lyrics, time) {
    var pastLines = lyrics.filter(function(l) {return l.time < time});
    var next = pastLines[pastLines.length - 1];

    return next;
}

function display(next, element) {
    element.innerHTML = next.line;
    element.className = next.cls;
}

function displayLyrics(player, lyrics, line) {
    var next = getNextLine(lyrics, player.currentTime)
    //console.log(player.currentTime, next);
    display(next, line);
}

function addKeyListeners(player) {
   document.addEventListener("keydown", function(event) { if (event.key === " ") { player.paused ? player.play() : player.pause() }});
   document.addEventListener("keydown", function(event) { if (event.key === "ArrowUp") { player.playbackRate += 0.1; }});
   document.addEventListener("keydown", function(event) { if (event.key === "ArrowDown") { player.playbackRate -= 0.1; }});
   document.addEventListener("keydown", function(event) { if (event.key === "ArrowLeft") { player.currentTime -= 1; }});
   document.addEventListener("keydown", function(event) { if (event.key === "ArrowRight") { player.currentTime += 1; }});
}

document.addEventListener("DOMContentLoaded", function(event) {
    var lyrics = parseLyrics(halloi);

    var line = document.getElementById("line");
    var player = document.getElementById("player");

    var intervalId;

    player.addEventListener("playing", function() { intervalId = setInterval(function() { displayLyrics(player, lyrics, line) }, FREQUENCY) } );
    player.addEventListener("pause", function() { clearInterval(intervalId) } );
    player.addEventListener("seeking", function() { displayLyrics(player, lyrics, line) } );

    addKeyListeners(player);
})  
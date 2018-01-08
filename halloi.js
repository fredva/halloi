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

function getNextLyric(time) {
    var pastLines = lyrics.filter(function(l) {return l[0] < time});
    if (pastLines.length) {
        return pastLines[pastLines.length - 1][1];
    }
    return "";
}

function display(text, element) {
    element.innerHTML = text;
}

function displayLyrics(player, lyric) {
    var next = getNextLyric(player.currentTime)
    console.log(player.currentTime, next);
    //console.log(next);
    display(next, lyric);

}

document.addEventListener("DOMContentLoaded", function(event) { 
    var lyric = document.getElementById("lyric");

    var player = document.getElementById("player");

    var intervalId;

    player.addEventListener("playing", function() { intervalId = setInterval(function() { displayLyrics(player, lyric) }, FREQUENCY) } );
    player.addEventListener("pause", function() { clearInterval(intervalId) } );
    
    setInterval(function() {
        //console.log(player.currentTime)
        //console.log(typeof(player.currentTime))
        var firsttime = lyrics[0][0];
        //console.log(firsttime)
        //console.log(firsttime > player.currentTime);

        
        var text = next != undefined ?  next[1] : ""
        console.log(text);
        lyric.innerHTML = text;
    }, 10000000)
})  